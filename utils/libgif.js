var bitsToNum = function(ba) {
    return ba.reduce(function(s, n) {
        return s * 2 + n;
    }, 0);
};

var byteToBitArr = function(bite) {
    var a = [];
    for (var i = 7; i >= 0; i--) {
        a.push(!!(bite & (1 << i)));
    }
    return a;
};

// Stream
/**
 * @constructor
 */
// Make compiler happy.
var Stream = function(data) {
    this.data = data;
    this.len = this.data.length;
    this.pos = 0;

    this.readByte = function() {
        if (this.pos >= this.data.length) {
            throw new Error('Attempted to read past end of stream.');
        }
        if (data instanceof Uint8Array) return data[this.pos++];
        else return data.charCodeAt(this.pos++) & 0xff;
    };

    this.readBytes = function(n) {
        var bytes = [];
        for (var i = 0; i < n; i++) {
            bytes.push(this.readByte());
        }
        return bytes;
    };

    this.read = function(n) {
        var s = '';
        for (var i = 0; i < n; i++) {
            s += String.fromCharCode(this.readByte());
        }
        return s;
    };

    this.readUnsigned = function() {
        // Little-endian.
        var a = this.readBytes(2);
        return (a[1] << 8) + a[0];
    };
};

var lzwDecode = function(minCodeSize, data) {
    // TODO: Now that the GIF parser is a bit different, maybe this should get an array of bytes instead of a String?
    var pos = 0; // Maybe this streaming thing should be merged with the Stream?
    var readCode = function(size) {
        var code = 0;
        for (var i = 0; i < size; i++) {
            if (data.charCodeAt(pos >> 3) & (1 << (pos & 7))) {
                code |= 1 << i;
            }
            pos++;
        }
        return code;
    };

    var output = [];

    var clearCode = 1 << minCodeSize;
    var eoiCode = clearCode + 1;

    var codeSize = minCodeSize + 1;

    var dict = [];

    var clear = function() {
        dict = [];
        codeSize = minCodeSize + 1;
        for (var i = 0; i < clearCode; i++) {
            dict[i] = [i];
        }
        dict[clearCode] = [];
        dict[eoiCode] = null;
    };

    var code;
    var last;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        last = code;
        code = readCode(codeSize);

        if (code === clearCode) {
            clear();
            continue;
        }
        if (code === eoiCode) break;

        if (code < dict.length) {
            if (last !== clearCode) {
                dict.push(dict[last].concat(dict[code][0]));
            }
        } else {
            if (code !== dict.length) throw new Error('Invalid LZW code.');
            dict.push(dict[last].concat(dict[last][0]));
        }
        output.push.apply(output, dict[code]);

        if (dict.length === 1 << codeSize && codeSize < 12) {
            // If we're at the last code and codeSize is 12, the next code will be a clearCode, and it'll be 12 bits long.
            codeSize++;
        }
    }

    // I don't know if this is technically an error, but some GIFs do it.
    //if (Math.ceil(pos / 8) !== data.length) throw new Error('Extraneous LZW bytes.');
    return output;
};

// The actual parsing; returns an object with properties.
var parseGIF = function(st, handler) {
    handler || (handler = {});

    // LZW (GIF-specific)
    var parseCT = function(entries) {
        // Each entry is 3 bytes, for RGB.
        var ct = [];
        for (var i = 0; i < entries; i++) {
            ct.push(st.readBytes(3));
        }
        return ct;
    };

    var readSubBlocks = function() {
        var size, data;
        data = '';
        do {
            size = st.readByte();
            data += st.read(size);
        } while (size !== 0);
        return data;
    };

    var parseHeader = function() {
        var hdr = {};
        hdr.sig = st.read(3);
        hdr.ver = st.read(3);
        if (hdr.sig !== 'GIF') throw new Error('Not a GIF file.'); // XXX: This should probably be handled more nicely.
        hdr.width = st.readUnsigned();
        hdr.height = st.readUnsigned();

        var bits = byteToBitArr(st.readByte());
        hdr.gctFlag = bits.shift();
        hdr.colorRes = bitsToNum(bits.splice(0, 3));
        hdr.sorted = bits.shift();
        hdr.gctSize = bitsToNum(bits.splice(0, 3));

        hdr.bgColor = st.readByte();
        hdr.pixelAspectRatio = st.readByte(); // if not 0, aspectRatio = (pixelAspectRatio + 15) / 64
        if (hdr.gctFlag) {
            hdr.gct = parseCT(1 << (hdr.gctSize + 1));
        }
        handler.hdr && handler.hdr(hdr);
    };

    var parseExt = function(block) {
        var parseGCExt = function(block) {
            st.readByte(); // Always 4
            var bits = byteToBitArr(st.readByte());
            block.reserved = bits.splice(0, 3); // Reserved; should be 000.
            block.disposalMethod = bitsToNum(bits.splice(0, 3));
            block.userInput = bits.shift();
            block.transparencyGiven = bits.shift();

            block.delayTime = st.readUnsigned();

            block.transparencyIndex = st.readByte();

            block.terminator = st.readByte();

            handler.gce && handler.gce(block);
        };

        var parseComExt = function(block) {
            block.comment = readSubBlocks();
            handler.com && handler.com(block);
        };

        var parsePTExt = function(block) {
            // No one *ever* uses this. If you use it, deal with parsing it yourself.
            st.readByte(); // Always 12
            block.ptHeader = st.readBytes(12);
            block.ptData = readSubBlocks();
            handler.pte && handler.pte(block);
        };

        var parseAppExt = function(block) {
            var parseNetscapeExt = function(block) {
                st.readByte(); // Always 3
                block.unknown = st.readByte(); // ??? Always 1? What is this?
                block.iterations = st.readUnsigned();
                block.terminator = st.readByte();
                handler.app &&
                    handler.app.NETSCAPE &&
                    handler.app.NETSCAPE(block);
            };

            var parseUnknownAppExt = function(block) {
                block.appData = readSubBlocks();
                // FIXME: This won't work if a handler wants to match on any identifier.
                handler.app &&
                    handler.app[block.identifier] &&
                    handler.app[block.identifier](block);
            };

            st.readByte(); // Always 11
            block.identifier = st.read(8);
            block.authCode = st.read(3);
            switch (block.identifier) {
                case 'NETSCAPE':
                    parseNetscapeExt(block);
                    break;
                default:
                    parseUnknownAppExt(block);
                    break;
            }
        };

        var parseUnknownExt = function(block) {
            block.data = readSubBlocks();
            handler.unknown && handler.unknown(block);
        };

        block.label = st.readByte();
        switch (block.label) {
            case 0xf9:
                block.extType = 'gce';
                parseGCExt(block);
                break;
            case 0xfe:
                block.extType = 'com';
                parseComExt(block);
                break;
            case 0x01:
                block.extType = 'pte';
                parsePTExt(block);
                break;
            case 0xff:
                block.extType = 'app';
                parseAppExt(block);
                break;
            default:
                block.extType = 'unknown';
                parseUnknownExt(block);
                break;
        }
    };

    var parseImg = function(img) {
        var deinterlace = function(pixels, width) {
            // Of course this defeats the purpose of interlacing. And it's *probably*
            // the least efficient way it's ever been implemented. But nevertheless...
            var newPixels = new Array(pixels.length);
            var rows = pixels.length / width;
            var cpRow = function(toRow, fromRow) {
                var fromPixels = pixels.slice(
                    fromRow * width,
                    (fromRow + 1) * width
                );
                newPixels.splice.apply(
                    newPixels,
                    [toRow * width, width].concat(fromPixels)
                );
            };

            // See appendix E.
            var offsets = [0, 4, 2, 1];
            var steps = [8, 8, 4, 2];

            var fromRow = 0;
            for (var pass = 0; pass < 4; pass++) {
                for (
                    var toRow = offsets[pass];
                    toRow < rows;
                    toRow += steps[pass]
                ) {
                    cpRow(toRow, fromRow);
                    fromRow++;
                }
            }

            return newPixels;
        };

        img.leftPos = st.readUnsigned();
        img.topPos = st.readUnsigned();
        img.width = st.readUnsigned();
        img.height = st.readUnsigned();

        var bits = byteToBitArr(st.readByte());
        img.lctFlag = bits.shift();
        img.interlaced = bits.shift();
        img.sorted = bits.shift();
        img.reserved = bits.splice(0, 2);
        img.lctSize = bitsToNum(bits.splice(0, 3));

        if (img.lctFlag) {
            img.lct = parseCT(1 << (img.lctSize + 1));
        }

        img.lzwMinCodeSize = st.readByte();

        var lzwData = readSubBlocks();

        img.pixels = lzwDecode(img.lzwMinCodeSize, lzwData);

        if (img.interlaced) {
            // Move
            img.pixels = deinterlace(img.pixels, img.width);
        }

        handler.img && handler.img(img);
    };

    var parseBlock = function() {
        var block = {};
        block.sentinel = st.readByte();

        switch (
            String.fromCharCode(block.sentinel) // For ease of matching
        ) {
            case '!':
                block.type = 'ext';
                parseExt(block);
                break;
            case ',':
                block.type = 'img';
                parseImg(block);
                break;
            case ';':
                block.type = 'eof';
                handler.eof && handler.eof(block);
                break;
            default:
                throw new Error(
                    'Unknown block: 0x' + block.sentinel.toString(16)
                ); // TODO: Pad this with a 0.
        }

        if (block.type !== 'eof') setTimeout(parseBlock, 0);
    };

    var parse = function() {
        parseHeader();
        setTimeout(parseBlock, 0);
    };

    parse();
};

var SuperGif = function(opts) {
    var options = {
        //viewport position
        vp_l: 0,
        vp_t: 0,
        vp_w: null,
        vp_h: null,
        //canvas sizes
        c_w: null,
        c_h: null
    };
    for (var i in opts) {
        options[i] = opts[i];
    }
    if (options.vp_w && options.vp_h) options.is_vp = true;

    var stream;
    var hdr;

    var loadError = null;
    var loading = false;

    var transparency = null;
    var delay = null;
    var disposalMethod = null;
    var disposalRestoreFromIdx = null;
    var lastDisposalMethod = null;
    var frame = null;
    var lastImg = null;

    var playing = true;
    var forward = true;

    var ctx_scaled = false;

    var frames = [];
    var frameOffsets = []; // elements have .x and .y properties

    var gif = options.gif;
    if (typeof options.auto_play == 'undefined')
        options.auto_play =
            !gif.getAttribute('rel:auto_play') ||
            gif.getAttribute('rel:auto_play') == '1';

    var onEndListener = options.on_end ? options.on_end : null;
    var loopDelay = options.loop_delay ? options.loop_delay : 0;
    var overrideLoopMode = options.loop_mode ? options.loop_mode : 'auto';
    var drawWhileLoading = options.draw_while_loading
        ? options.draw_while_loading
        : true;
    var showProgressBar = drawWhileLoading
        ? options.show_progress_bar
            ? options.show_progress_bar
            : true
        : false;
    var progressBarHeight = options.progressbar_height
        ? options.progressbar_height
        : 25;
    var progressBarBackgroundColor = options.progressbar_background_color
        ? options.progressbar_background_color
        : 'rgba(255,255,255,0.4)';
    var progressBarForegroundColor = options.progressbar_foreground_color
        ? options.progressbar_foreground_color
        : 'rgba(255,0,22,.8)';

    var clear = function() {
        transparency = null;
        delay = null;
        lastDisposalMethod = disposalMethod;
        disposalMethod = null;
        frame = null;
    };

    // XXX: There's probably a better way to handle catching exceptions when
    // callbacks are involved.
    var doParse = function() {
        try {
            parseGIF(stream, handler);
        } catch (err) {
            doLoadError('parse');
        }
    };

    var setSizes = function(w, h) {
        canvas.width = w * get_canvas_scale();
        canvas.height = h * get_canvas_scale();
        toolbar.style.minWidth = w * get_canvas_scale() + 'px';

        tmpCanvas.width = w;
        tmpCanvas.height = h;
        tmpCanvas.style.width = w + 'px';
        tmpCanvas.style.height = h + 'px';
        tmpCanvas.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
    };

    var setFrameOffset = function(frame, offset) {
        if (!frameOffsets[frame]) {
            frameOffsets[frame] = offset;
            return;
        }
        if (typeof offset.x !== 'undefined') {
            frameOffsets[frame].x = offset.x;
        }
        if (typeof offset.y !== 'undefined') {
            frameOffsets[frame].y = offset.y;
        }
    };

    var doShowProgress = function(pos, length, draw) {
        if (draw && showProgressBar) {
            var height = progressBarHeight;
            var left, mid, top, width;
            if (options.is_vp) {
                if (!ctx_scaled) {
                    top = options.vp_t + options.vp_h - height;
                    left = options.vp_l;
                    mid = left + (pos / length) * options.vp_w;
                    width = canvas.width;
                } else {
                    top =
                        (options.vp_t + options.vp_h - height) /
                        get_canvas_scale();
                    height = height / get_canvas_scale();
                    left = options.vp_l / get_canvas_scale();
                    mid =
                        left +
                        (pos / length) * (options.vp_w / get_canvas_scale());
                    width = canvas.width / get_canvas_scale();
                }
            } else {
                top =
                    (canvas.height - height) /
                    (ctx_scaled ? get_canvas_scale() : 1);
                mid =
                    ((pos / length) * canvas.width) /
                    (ctx_scaled ? get_canvas_scale() : 1);
                width = canvas.width / (ctx_scaled ? get_canvas_scale() : 1);
                height /= ctx_scaled ? get_canvas_scale() : 1;
            }

            ctx.fillStyle = progressBarBackgroundColor;
            ctx.fillRect(mid, top, width - mid, height);

            ctx.fillStyle = progressBarForegroundColor;
            ctx.fillRect(0, top, mid, height);
        }
    };

    var doLoadError = function(originOfError) {
        var drawError = function() {
            ctx.fillStyle = 'black';
            ctx.fillRect(
                0,
                0,
                options.c_w ? options.c_w : hdr.width,
                options.c_h ? options.c_h : hdr.height
            );
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.moveTo(0, 0);
            ctx.lineTo(
                options.c_w ? options.c_w : hdr.width,
                options.c_h ? options.c_h : hdr.height
            );
            ctx.moveTo(0, options.c_h ? options.c_h : hdr.height);
            ctx.lineTo(options.c_w ? options.c_w : hdr.width, 0);
            ctx.stroke();
        };

        loadError = originOfError;
        hdr = {
            width: gif.width,
            height: gif.height
        }; // Fake header.
        frames = [];
        drawError();
    };

    var doHdr = function(_hdr) {
        hdr = _hdr;
        setSizes(hdr.width, hdr.height);
    };

    var doGCE = function(gce) {
        pushFrame();
        clear();
        transparency = gce.transparencyGiven ? gce.transparencyIndex : null;
        delay = gce.delayTime;
        disposalMethod = gce.disposalMethod;
        // We don't have much to do with the rest of GCE.
    };

    var pushFrame = function() {
        if (!frame) return;
        frames.push({
            data: frame.getImageData(0, 0, hdr.width, hdr.height),
            delay: delay
        });
        frameOffsets.push({
            x: 0,
            y: 0
        });
    };

    var doImg = function(img) {
        if (!frame) frame = tmpCanvas.getContext('2d');

        var currIdx = frames.length;

        //ct = color table, gct = global color table
        var ct = img.lctFlag ? img.lct : hdr.gct; // TODO: What if neither exists?

        /*
        Disposal method indicates the way in which the graphic is to
        be treated after being displayed.

        Values :    0 - No disposal specified. The decoder is
                        not required to take any action.
                    1 - Do not dispose. The graphic is to be left
                        in place.
                    2 - Restore to background color. The area used by the
                        graphic must be restored to the background color.
                    3 - Restore to previous. The decoder is required to
                        restore the area overwritten by the graphic with
                        what was there prior to rendering the graphic.

                        Importantly, "previous" means the frame state
                        after the last disposal of method 0, 1, or 2.
        */
        if (currIdx > 0) {
            if (lastDisposalMethod === 3) {
                // Restore to previous
                // If we disposed every frame including first frame up to this point, then we have
                // no composited frame to restore to. In this case, restore to background instead.
                if (disposalRestoreFromIdx !== null) {
                    frame.putImageData(
                        frames[disposalRestoreFromIdx].data,
                        0,
                        0
                    );
                } else {
                    frame.clearRect(
                        lastImg.leftPos,
                        lastImg.topPos,
                        lastImg.width,
                        lastImg.height
                    );
                }
            } else {
                disposalRestoreFromIdx = currIdx - 1;
            }

            if (lastDisposalMethod === 2) {
                // Restore to background color
                // Browser implementations historically restore to transparent; we do the same.
                // http://www.wizards-toolkit.org/discourse-server/viewtopic.php?f=1&t=21172#p86079
                frame.clearRect(
                    lastImg.leftPos,
                    lastImg.topPos,
                    lastImg.width,
                    lastImg.height
                );
            }
        }
        // else, Undefined/Do not dispose.
        // frame contains final pixel data from the last frame; do nothing

        //Get existing pixels for img region after applying disposal method
        var imgData = frame.getImageData(
            img.leftPos,
            img.topPos,
            img.width,
            img.height
        );

        //apply color table colors
        img.pixels.forEach(function(pixel, i) {
            // imgData.data === [R,G,B,A,R,G,B,A,...]
            if (pixel !== transparency) {
                imgData.data[i * 4 + 0] = ct[pixel][0];
                imgData.data[i * 4 + 1] = ct[pixel][1];
                imgData.data[i * 4 + 2] = ct[pixel][2];
                imgData.data[i * 4 + 3] = 255; // Opaque.
            }
        });

        frame.putImageData(imgData, img.leftPos, img.topPos);

        if (!ctx_scaled) {
            ctx.scale(get_canvas_scale(), get_canvas_scale());
            ctx_scaled = true;
        }

        // We could use the on-page canvas directly, except that we draw a progress
        // bar for each image chunk (not just the final image).
        if (drawWhileLoading) {
            ctx.drawImage(tmpCanvas, 0, 0);
            drawWhileLoading = options.auto_play;
        }

        lastImg = img;
    };

    var player = (function() {
        var i = -1;
        var iterationCount = 0;

        /**
         * Gets the index of the frame "up next".
         * @returns {number}
         */
        var getNextFrameNo = function() {
            var delta = forward ? 1 : -1;
            return (i + delta + frames.length) % frames.length;
        };

        var stepFrame = function(amount) {
            // XXX: Name is confusing.
            i = i + amount;

            putFrame();
        };

        var step = (function() {
            var stepping = false;

            var completeLoop = function() {
                if (onEndListener !== null) onEndListener(gif);
                iterationCount++;

                if (overrideLoopMode !== false || iterationCount < 0) {
                    doStep();
                } else {
                    stepping = false;
                    playing = false;
                }
            };

            var doStep = function() {
                stepping = playing;
                if (!stepping) return;

                stepFrame(1);
                var delay = frames[i].delay * 10;
                if (!delay) delay = 100; // FIXME: Should this even default at all? What should it be?

                var nextFrameNo = getNextFrameNo();
                if (nextFrameNo === 0) {
                    delay += loopDelay;
                    setTimeout(completeLoop, delay);
                } else {
                    setTimeout(doStep, delay);
                }
            };

            return function() {
                if (!stepping) setTimeout(doStep, 0);
            };
        })();

        var putFrame = function() {
            var offset;
            i = parseInt(i, 10);

            if (i > frames.length - 1) {
                i = 0;
            }

            if (i < 0) {
                i = 0;
            }

            offset = frameOffsets[i];

            tmpCanvas
                .getContext('2d')
                .putImageData(frames[i].data, offset.x, offset.y);
            ctx.globalCompositeOperation = 'copy';
            ctx.drawImage(tmpCanvas, 0, 0);
        };

        var play = function() {
            playing = true;
            step();
        };

        var pause = function() {
            playing = false;
        };

        return {
            init: function() {
                if (loadError) return;

                if (!(options.c_w && options.c_h)) {
                    ctx.scale(get_canvas_scale(), get_canvas_scale());
                }

                if (options.auto_play) {
                    step();
                } else {
                    i = 0;
                    putFrame();
                }
            },
            step: step,
            play: play,
            pause: pause,
            playing: playing,
            move_relative: stepFrame,
            current_frame: function() {
                return i;
            },
            length: function() {
                return frames.length;
            },
            move_to: function(frame_idx) {
                i = frame_idx;
                putFrame();
            }
        };
    })();

    var doDecodeProgress = function(draw) {
        doShowProgress(stream.pos, stream.data.length, draw);
    };

    var doNothing = function() {};
    /**
     * @param{boolean=} draw Whether to draw progress bar or not; this is not idempotent because of translucency.
     *                       Note that this means that the text will be unsynchronized with the progress bar on non-frames;
     *                       but those are typically so small (GCE etc.) that it doesn't really matter. TODO: Do this properly.
     */
    var withProgress = function(fn, draw) {
        return function(block) {
            fn(block);
            doDecodeProgress(draw);
        };
    };

    var handler = {
        hdr: withProgress(doHdr),
        gce: withProgress(doGCE),
        com: withProgress(doNothing),
        // I guess that's all for now.
        app: {
            // TODO: Is there much point in actually supporting iterations?
            NETSCAPE: withProgress(doNothing)
        },
        img: withProgress(doImg, true),
        eof: function() {
            //toolbar.style.display = '';
            pushFrame();
            doDecodeProgress(false);
            if (!(options.c_w && options.c_h)) {
                canvas.width = hdr.width * get_canvas_scale();
                canvas.height = hdr.height * get_canvas_scale();
            }
            player.init();
            loading = false;
            if (load_callback) {
                load_callback(gif);
            }
        }
    };

    var init = function() {
        var div = document.createElement('div');
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        toolbar = document.createElement('div');

        tmpCanvas = document.createElement('canvas');

        div.width = canvas.width = gif.width;
        div.height = canvas.height = gif.height;
        toolbar.style.minWidth = gif.width + 'px';

        div.className = 'jsgif';
        toolbar.className = 'jsgif_toolbar';
        div.appendChild(canvas);
        div.appendChild(toolbar);

        if (options.c_w && options.c_h) setSizes(options.c_w, options.c_h);
        initialized = true;
    };

    var get_canvas_scale = function() {
        var scale;
        if (options.max_width && hdr && hdr.width > options.max_width) {
            scale = options.max_width / hdr.width;
        } else {
            scale = 1;
        }
        return scale;
    };

    var canvas, ctx, toolbar, tmpCanvas;
    var initialized = false;
    var load_callback = false;

    var load_setup = function(callback) {
        if (loading) return false;
        if (callback) load_callback = callback;
        else load_callback = false;

        loading = true;
        frames = [];
        clear();
        disposalRestoreFromIdx = null;
        lastDisposalMethod = null;
        frame = null;
        lastImg = null;

        return true;
    };

    return {
        // play controls
        play: player.play,
        pause: player.pause,
        move_relative: player.move_relative,
        move_to: player.move_to,

        // getters for instance vars
        get_playing: function() {
            return playing;
        },
        get_canvas: function() {
            return canvas;
        },
        get_canvas_scale: function() {
            return get_canvas_scale();
        },
        get_loading: function() {
            return loading;
        },
        get_auto_play: function() {
            return options.auto_play;
        },
        get_length: function() {
            return player.length();
        },
        get_current_frame: function() {
            return player.current_frame();
        },
        load_url: function(src, callback) {
            if (!load_setup(callback)) return;

            var h = new XMLHttpRequest();
            // new browsers (XMLHttpRequest2-compliant)
            h.open('GET', src, true);

            if ('overrideMimeType' in h) {
                h.overrideMimeType('text/plain; charset=x-user-defined');
            }

            // old browsers (XMLHttpRequest-compliant)
            else if ('responseType' in h) {
                h.responseType = 'arraybuffer';
            }

            // IE9 (Microsoft.XMLHTTP-compliant)
            else {
                h.setRequestHeader('Accept-Charset', 'x-user-defined');
            }

            h.onloadstart = function() {
                // Wait until connection is opened to replace the gif element with a canvas to avoid a blank img
                if (!initialized) init();
            };
            h.onload = function() {
                if (this.status != 200) {
                    doLoadError('xhr - response');
                }
                // emulating response field for IE9
                if (!('response' in this)) {
                    // eslint-disable-next-line no-undef
                    this.response = new VBArray(this.responseText)
                        .toArray()
                        .map(String.fromCharCode)
                        .join('');
                }
                var data = this.response;
                if (data.toString().indexOf('ArrayBuffer') > 0) {
                    data = new Uint8Array(data);
                }

                stream = new Stream(data);
                setTimeout(doParse, 0);
            };
            h.onprogress = function(e) {
                if (e.lengthComputable) doShowProgress(e.loaded, e.total, true);
            };
            h.onerror = function() {
                doLoadError('xhr');
            };
            h.send();
        },
        load: function(callback) {
            this.load_url(
                gif.getAttribute('rel:animated_src') || gif.src,
                callback
            );
        },
        load_raw: function(arr, callback) {
            if (!load_setup(callback)) return;
            if (!initialized) init();
            stream = new Stream(arr);
            setTimeout(doParse, 0);
        },
        set_frame_offset: setFrameOffset
    };
};

export default SuperGif;
