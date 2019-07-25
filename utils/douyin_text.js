import GIF from 'gif.js';

Array.prototype.sum = function() {
    return this.reduce(function(partial, value) {
        return partial + value;
    });
};

function DYText(opts) {
    var _opts = opts || {};

    this.word = _opts.word || 'Hello World';

    this.fontSize = _opts.fontSize + 'px' || '120px';
    this.height = (_opts.fontSize || 120) * 1.5;
    this.fontFamily =
        _opts.fontFamily ||
        '-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif';
    this.font =
        'italic small-caps 900 ' + this.fontSize + ' ' + this.fontFamily;
    this.offset = this.height * _opts.offset || this.height * 0.035;

    this.x = _opts.x || 0;
    this.y = _opts.y || 0;

    this.divideNum = _opts.divideNum || 6;
    this.seed = _opts.seed || 0.51;

    this.offsetLeft = true;

    this.colorLeft = _opts.colorLeft || 'yellow';
    this.colorRight = _opts.colorRight || 'red';
    this.color = _opts.color || 'black';
    this.colorBg = _opts.colorBg || 'black';

    this.fullscreen = true;

    this.dev = !!_opts.dev;

    this.gifLength = _opts.gifLength || 10;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    this.ctx = ctx;

    this.bgImg = _opts.bgImg || null;
}

DYText.prototype.random = function(min, max) {
    var num = Math.random() * (max - min) + min;
    return num;
};

DYText.prototype.sin = function(len) {
    // console.log(len);
    var res = [];
    for (let i = 0; i < len; i++) {
        var num =
            parseFloat(
                Math.abs(Math.sin(this.random(0, 6)))
                    .toString()
                    .slice(0, 4)
            ) * 100;
        res.push(num);
    }

    var sum = res.sum();

    for (let i = 0; i < res.length; i++) {
        res[i] = res[i] / sum;
    }

    return res;
};

DYText.prototype.generate = function() {
    var res = [];

    var x = this.x,
        width = this.width,
        height = this.height,
        seed = this.seed;

    var i = this.divideNum;

    var height_seeds = this.sin(i);

    for (let index = 0; index < i; index++) {
        this.offsetLeft = !this.offsetLeft;

        var _yn =
                index == 0
                    ? 0
                    : res[index - 1].get.height + res[index - 1].get.y,
            _h = height * height_seeds[index];

        if (_h <= 2) {
            _h = 2;
        }

        var get = {
                x: x,
                y: _yn,
                width: width,
                height: _h
            },
            put = {
                x: x + index * (this.offsetLeft ? -1 : 1) * seed,
                y: _yn
            },
            obj = {
                get: get,
                put: put
            };

        // seed += 0.0005;

        res.push(obj);
    }

    this.divides = res;
};

DYText.prototype.start = function() {
    if (this._status === 'READY') {
        this.update();
    } else {
        this.init();
        this.draw();
        this.drawBg();
        this.generate();
        this.copy();
        this._status === 'READY';
    }
};

DYText.prototype.update = function(seed) {
    this.seed = seed || this.seed;

    if (this._status === 'READY') {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.init();
        this.draw();
        this.drawBg();
        this.generate();
        this.copy();
    } else {
        this.start();
    }
};

DYText.prototype.init = function() {
    var canvas = this.ctx.canvas,
        ctx = this.ctx;

    ctx.textBaseline = 'top';
    ctx.font = this.font;

    var word = this.word;

    this.width = ctx.measureText(word).width + this.offset * 2;

    canvas.width = this.width + 100;
    this.x = 50;

    canvas.height = this.height;
};

DYText.prototype.drawBg = function() {
    var canvasBg = document.createElement('canvas'),
        ctxBg = canvasBg.getContext('2d');

    canvasBg.width = this.ctx.canvas.width;
    canvasBg.height = this.ctx.canvas.height;

    ctxBg.fillStyle = this.colorBg;
    // ctxBg.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height*0.8);

    var word = this.word,
        offset = this.offset,
        x = this.x,
        y = this.y;

    var ctx = this.ctx;

    ctxBg.textBaseline = 'top';
    ctxBg.font = this.font;

    ctxBg.fillStyle = this.color;
    ctxBg.fillText(word, x + offset, y + offset);

    ctxBg.drawImage(ctx.canvas, 0, 0);

    ctx.drawImage(canvasBg, 0, 0);
};

DYText.prototype.draw = function() {
    var word = this.word,
        offset = this.offset,
        x = this.x,
        y = this.y;

    var ctx = this.ctx;

    ctx.textBaseline = 'top';
    ctx.font = this.font;

    ctx.fillStyle = this.colorLeft;
    ctx.fillText(word, x - offset, y - offset);

    ctx.fillStyle = this.color;
    ctx.fillText(word, x, y);

    ctx.globalCompositeOperation = 'xor';
    ctx.fillStyle = this.colorRight;
    ctx.fillText(word, x + offset, y + offset);
    ctx.globalCompositeOperation = 'source-over';
};

DYText.prototype.copy = function() {
    var divides = this.divides;
    var ctx = this.ctx;

    ctx.globalCompositeOperation = 'source-over';

    for (let index = 0; index < divides.length; index++) {
        var d = divides[index];

        var imgData = ctx.getImageData(
            d.get.x,
            d.get.y,
            d.get.width,
            d.get.height
        );

        ctx.putImageData(imgData, d.put.x, d.put.y);

        if (this.dev) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(d.get.x, d.get.y, d.get.width, d.get.height);
        }
    }
};

DYText.prototype.toCanvas = function(targetCtx) {
    var ctx = this.ctx;
    let tw = ctx.canvas.width,
        th = ctx.canvas.height;

    targetCtx.canvas.width = tw;
    targetCtx.canvas.height = th;

    this.bgImg
        ? targetCtx.drawImage(this.bgImg, 0, 0)
        : (targetCtx.fillStyle = this.colorBg);
    targetCtx.fillRect(0, 0, tw, th);

    targetCtx.drawImage(ctx.canvas, 0, th / 5);
};

DYText.prototype.createFrames = function(num) {
    var frames = [],
        n = num || this.gifLength;

    for (let index = 0; index < n; index++) {
        this.update();

        var canvas1 = document.createElement('canvas'),
            ctx1 = canvas1.getContext('2d');

        this.toCanvas(ctx1);

        frames.push(canvas1);
    }

    this.frames = frames;

    return frames;
};

DYText.prototype.createGif = function(cb) {
    var gif = new GIF({
        workers: 20,
        quality: 10,
        workerScript: '/js/gif.worker.js'
    });

    var frames = this.createFrames();

    for (let index = 0; index < frames.length; index++) {
        gif.addFrame(frames[index], {
            delay: 200
        });
    }

    gif.on('finished', function(blob) {
        cb(URL.createObjectURL(blob));
    });

    gif.render();
};

export default DYText;
