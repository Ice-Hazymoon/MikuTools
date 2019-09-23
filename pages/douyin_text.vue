<template>
    <div class="douyin_text">
        <nya-container title="抖音样式文字生成">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="options.word"
                    label="输入要生成的文字"
                    placeholder="Hello MikuTools"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="updatePreview"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="updatePreview"
                >
                    {{ loading ? '生成中' : '开始生成' }}
                </button>
            </div>
            <nya-checkbox v-model="options.gif" label="使用 GIF 格式" />
            <br>
            <div class="nya-subtitle">
                抖动幅度
            </div>
            <client-only>
                <vue-slider v-model="options.seed" lazy :min="1" :max="100" @change="updatePreview" />
            </client-only>
            <br>
            <div class="nya-subtitle">
                字体大小
            </div>
            <client-only>
                <vue-slider v-model="options.fontSize" lazy :min="18" :max="200" @change="updatePreview" />
            </client-only>
            <br>
            <div class="nya-subtitle">
                背景颜色
            </div>
            <client-only>
                <chrome-picker :value="colors" @input="updateColor" />
            </client-only>
        </nya-container>

        <nya-container v-if="options.gif ? gifUrl : imgUrl" title="生成成功" class="preview">
            <a :href="options.gif ? gifUrl : imgUrl" target="_blank" rel="noopener noreferrer">
                <img :src="options.gif ? gifUrl : imgUrl" alt="image">
            </a>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>如果生成时间过长或生成失败请使用其他浏览器，推荐使用 Chrome</li>
                <li>右键另存为下载或长按保存</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import DYText from '~/utils/douyin_text.js';
import { Chrome } from 'vue-color';
import 'vue-slider-component/theme/default.css';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}

export default {
    name: 'DouyinText',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'chrome-picker': Chrome,
        VueSlider
    },
    data() {
        return {
            loading: false,
            colors: '#000',
            options: {
                word: 'Hello MikuTools',
                gif: false,
                divider: false,
                color: 'white',
                colorBg: '#1c0b1b',
                colorLeft: '#00F5EB',
                colorRight: '#FF0050',
                dev: false,
                seed: 20,
                fontSize: 110
            },
            dytext: null,
            imgUrl: '',
            gifUrl: ''
        };
    },
    watch: {
        'options.gif'(val) {
            this.loading = true;
            if (val) {
                this.createGif();
            } else {
                this.createImg();
            }
        }
    },
    mounted() {
        this.updatePreview();
    },
    methods: {
        init() {
            this.dytext = new DYText(this.options);
        },
        createImg() {
            let canvasTarget = document.createElement('canvas');
            let ctxTarget = canvasTarget.getContext('2d');
            canvasTarget.width = window.innerWidth;
            this.dytext.start();
            this.dytext.toCanvas(ctxTarget);

            canvasTarget.toBlob(url => {
                this.imgUrl = URL.createObjectURL(url);
                this.loading = false;
            });
        },
        createGif() {
            this.dytext.createGif(gif => {
                this.gifUrl = gif;
                this.loading = false;
            });
        },
        updatePreview() {
            this.loading = true;
            this.init();
            this.dytext.seed = 0.05 * this.options.seed;
            if (this.options.gif) {
                this.createGif();
            } else {
                this.createImg();
            }
        },
        updateColor(val) {
            this.options.colorBg = val.hex8;
        }
    }
};
</script>

<style lang="scss">
.douyin_text {
    .nya-input {
        display: block;
    }
    img {
        max-width: 100%;
    }
    .nya-checkbox {
        margin: 15px 0;
    }
}
</style>
