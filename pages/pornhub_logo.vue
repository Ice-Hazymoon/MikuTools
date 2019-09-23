<template>
    <div class="pornhub_logo">
        <nya-container title="Pornhub 风格Logo生成">
            <div class="nya-subtitle">
                点击下面的文字开始编辑
            </div>
            <div class="logo" :class="{'vertical' : vertical, 'transparent': transparent}">
                <div ref="preview" class="box">
                    <div class="l" :style="{'font-size': `${fontSize}px`}" contenteditable="true" v-text="'Porn'"></div>
                    <div class="r" :style="{'font-size': `${fontSize}px`, 'border-radius': `${fontSize / 10}px`}" contenteditable="true" v-text="'hub'"></div>
                </div>
            </div>
            <div class="nya-subtitle">
                文字大小
            </div>
            <client-only>
                <vue-slider v-model="fontSize" lazy :min="10" :max="200" />
            </client-only>
            <nya-checkbox v-model="vertical" label="使用竖版样式" />
            <nya-checkbox v-model="transparent" label="使用透明背景" />
            <div class="nya-btn" @click="convert">
                {{ requestIn ? '生成中' : '立即生成' }}
            </div>
        </nya-container>

        <nya-container v-if="results" title="生成成功">
            <img :src="results" alt="results">
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li><b><nuxt-link to="/youtube_logo">点这里切换为YouTube 风格制作</nuxt-link></b></li>
                <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 Chrome</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import 'vue-slider-component/theme/default.css';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
import domtoimage from 'dom-to-image';
import createDownload from '~/utils/createDownload.js';
export default {
    name: 'PornhubLogo',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        VueSlider
    },
    data() {
        return {
            content: '',
            results: '',
            fontSize: 70,
            vertical: false,
            transparent: false,
            requestIn: false
        };
    },
    methods: {
        convert() {
            this.requestIn = true;
            domtoimage
                .toPng(this.$refs.preview)
                .then(e => {
                    this.results = e;
                    this.requestIn = false;
                    createDownload(e, 'logo.png');
                })
                .catch(err => {
                    this.requestIn = false;
                    this.$modal.show('dialog', {
                        title: '生成失败',
                        text: `ERROR: ${err}`
                    });
                });
        }
    }
};
</script>

<style lang="scss">
.pornhub_logo {
    .logo {
        overflow: auto;
        background-color: #000000;
        border: var(--t1) 1px solid;
        border-radius: 5px;
        font-family: Arial, Helvetica, sans-serif, 'Microsoft YaHei';
        text-align: center;
        .box {
            background-color: #000000;
            padding: 30px 35px;
            white-space: nowrap;
            font-size: 0;
            margin: 0 auto;
            display: inline-block;
            .l {
                display: inline-block;
                white-space: nowrap;
                font-size: 60px;
                color: #ffffff;
                margin-right: 10px;
            }
            .r {
                display: inline-block;
                white-space: nowrap;
                font-size: 60px;
                background-color: #f79817;
                color: #000000;
                padding: 5px 10px;
                border-radius: 7px;
                font-weight: bold;
            }
        }
        &.vertical {
            .box {
                .l,
                .r {
                    display: block;
                }
                .l {
                    margin-right: 0;
                }
            }
        }
        &.transparent {
            .box {
                background-color: transparent;
            }
        }
    }
    .nya-checkbox {
        display: block;
        margin-top: 15px;
    }
    .nya-btn,
    .nya-subtitle {
        margin-top: 15px;
    }
    img {
        max-width: 100%;
    }
}
</style>
