<template>
    <div class="anime4k">
        <nya-container title="Anime4k">
            <div class="inputbtn">
                <nya-input v-model="txtSrc" label="请输入视频/图片地址" placeholder="https://..." />
                <button type="button" class="nya-btn" @click="onSourceChanged">
                    生成
                </button>
            </div>
            <div class="nya-subtitle">
                或者使用本地图片/视频
            </div>
            <nya-input
                v-model="file"
                fullwidth
                accept="image/*, video/*"
                type="file"
                placeholder="点击这里选择文件"
                @change="onSelectFile"
            />
            <div class="nya-subtitle">
                Scale
            </div>
            <client-only>
                <vue-slider
                    v-model="scale"
                    lazy
                    :min="1"
                    :max="4"
                    :interval="0.01"
                    @dragging="onScaleChanged"
                />
            </client-only>
            <div class="nya-subtitle">
                Bold
            </div>
            <client-only>
                <vue-slider v-model="bold" lazy :min="0" :max="8" :interval="0.001" />
            </client-only>
            <div class="nya-subtitle">
                Blur
            </div>
            <client-only>
                <vue-slider v-model="blur" lazy :min="0" :max="8" :interval="0.001" />
            </client-only>
        </nya-container>
        <nya-container title="预览">
            {{ errorMsg }}
            <canvas v-show="!errorMsg" ref="canvas" style="width:100%"></canvas>
            <video
                ref="video"
                style="display:none"
                autoplay
                loop
                preload="auto"
                crossorigin="anonymous"
                @canplaythrough="onCanplaythrough"
                @loadedmetadata="onLoadedmetadata"
                @error="onError"
            ></video>
        </nya-container>
        <nya-container title="说明">
            <ul class="nya-list">
                <li>算法来源：<a href="https://github.com/bloc97/Anime4K" target="_blank" rel="noopener noreferrer">Anime4K</a></li>
                <li>只是把官方 web 实现简单的移植到了mikutools；纯浏览器实现，因此原图（视频）、Scale 过大会卡死，请珍惜您的设备</li>
                <li>暂时不支持下载视频</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import Scaler from '../utils/anime4k';
import 'vue-slider-component/theme/default.css';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
export default {
    name: 'Anime4k',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        VueSlider
    },
    data() {
        return {
            txtSrc: '',
            file: null,
            scale: 1.25,
            bold: 6,
            blur: 2,
            scaler: null,
            gl: null,
            errorMsg: '请先选择图片视频！'
        };
    },
    mounted() {
        this.initScaler();
    },
    methods: {
        initScaler() {
            const canvas = this.$refs.canvas;

            this.gl = canvas.getContext('webgl');
            this.scaler = new Scaler(this.gl);

            function render() {
                if (this.scaler) {
                    this.scaler.bold = parseFloat(this.bold);
                    this.scaler.blur = parseFloat(this.blur);
                    this.scaler.render();
                }
                requestAnimationFrame(render.bind(this));
            }
            requestAnimationFrame(render.bind(this));
        },
        getSourceType(uri) {
            const movTypes = ['mp4', 'webm', 'ogv', 'ogg'];

            let ext = uri
                .split('.')
                .pop()
                .split(/#|\?/)[0];

            for (let i = 0; i < movTypes.length; ++i) {
                if (ext === movTypes[i]) {
                    return 'mov';
                }
            }

            return 'img';
        },
        changeImage(src) {
            this.$refs.video.pause();

            const inputImg = new Image();
            inputImg.crossOrigin = 'Anonymous';
            inputImg.src = src;
            inputImg.onload = function() {
                this.errorMsg = '';
                const scale = parseFloat(this.scale);
                this.scaler.inputImage(inputImg);
                this.scaler.resize(scale);
            }.bind(this);
            inputImg.onerror = function() {
                this.errorMsg = "Can't load the image.";
            };
        },
        changeVideo(src) {
            const video = this.$refs.video;
            video.src = src;
        },
        onSourceChanged() {
            const uri = this.txtSrc;
            if (this.getSourceType(uri) == 'img') {
                this.changeImage(uri);
            } else {
                this.changeVideo(uri);
            }
        },
        onCanplaythrough({ target }) {
            this.errorMsg = '';
            target.play();
        },
        onLoadedmetadata({ target }) {
            this.scaler = new Scaler(this.gl);
            this.scaler.inputVideo(target);
            this.scaler.resize(this.scale);
        },
        onError() {
            this.errorMsg = "Can't load the video.";
        },
        onScaleChanged(value) {
            this.scaler.resize(parseFloat(value));
        },
        onSelectFile({ target }) {
            if (target.files && target.files[0]) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    let src = e.target.result;
                    if (this.getSourceType(target.value) == 'img') {
                        this.changeImage(src);
                    } else {
                        this.changeVideo(src);
                    }
                }.bind(this);
                reader.readAsDataURL(target.files[0]);
            }
        }
    }
};
</script>

<style>
.nya-subtitle {
    margin-top: 15px;
}
</style>
