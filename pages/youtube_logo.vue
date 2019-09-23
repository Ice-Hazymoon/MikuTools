<template>
    <div class="youtube_logo">
        <nya-container title="YouTube 风格Logo生成">
            <div class="nya-subtitle">
                点击下面的文字开始编辑
            </div>
            <div class="logo" :class="{'transparent': transparent}">
                <div ref="preview" class="box">
                    <div class="l" :style="{'font-size': `${fontSize}px`}" contenteditable="true" v-text="'You'"></div>
                    <div class="r" :style="{'font-size': `${fontSize}px`, 'border-radius': `${fontSize}px`}">
                        <span contenteditable="true" v-text="'Tube'"></span>
                        <img src="~/assets/youtube-border.png" alt="lt" class="lt">
                        <img src="~/assets/youtube-border.png" alt="lb" class="lb">
                        <img src="~/assets/youtube-border.png" alt="rt" class="rt">
                        <img src="~/assets/youtube-border.png" alt="rb" class="rb">
                    </div>
                </div>
            </div>
            <div class="nya-subtitle">
                文字大小
            </div>
            <client-only>
                <vue-slider v-model="fontSize" lazy :min="60" :max="200" />
            </client-only>
            <nya-checkbox v-model="transparent" label="使用透明背景" />
            <div class="nya-btn" @click="convert">
                {{ loading ? '生成中' : '立即生成' }}
            </div>
        </nya-container>

        <nya-container v-if="results" title="生成成功">
            <img :src="results" alt="results">
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>
                    <b>
                        <nuxt-link to="/pornhub_logo">点这里切换为Pornhub 风格制作</nuxt-link>
                    </b>
                </li>
                <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 Chrome</li>
                <li>由于某些原因，圆角可能不太平滑，如果你是开发者有更好的方案可以联系我</li>
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
    name: 'YoutubeLogo',
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
            transparent: false,
            loading: false
        };
    },
    methods: {
        convert() {
            this.loading = true;
            domtoimage
                .toPng(this.$refs.preview)
                .then(e => {
                    this.results = e;
                    this.loading = false;
                    createDownload(e, 'logo.png');
                })
                .catch(err => {
                    this.loading = false;
                    this.$swal({
                        type: 'error',
                        title: '生成失败',
                        text: err
                    });
                });
        }
    }
};
</script>

<style lang="scss">
/* cyrillic */
@font-face {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    src: local('Oswald Regular'), local('Oswald-Regular'),
        url(https://fonts.gstatic.com/s/oswald/v16/TK3iWkUHHAIjg752HT8Ghe4.woff2)
            format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    src: local('Oswald Regular'), local('Oswald-Regular'),
        url(https://fonts.gstatic.com/s/oswald/v16/TK3iWkUHHAIjg752Fj8Ghe4.woff2)
            format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    src: local('Oswald Regular'), local('Oswald-Regular'),
        url(https://fonts.gstatic.com/s/oswald/v16/TK3iWkUHHAIjg752Fz8Ghe4.woff2)
            format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
        U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    src: local('Oswald Regular'), local('Oswald-Regular'),
        url(https://fonts.gstatic.com/s/oswald/v16/TK3iWkUHHAIjg752GT8G.woff2)
            format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
        U+2215, U+FEFF, U+FFFD;
}
.youtube_logo {
    .logo {
        overflow: auto;
        background-color: #ffffff;
        border: var(--t1) 1px solid;
        border-radius: 5px;
        text-align: center;
        .box {
            background-color: #ffffff;
            padding: 30px 35px;
            white-space: nowrap;
            font-size: 0;
            margin: 0 auto;
            display: inline-block;
            font-family: 'Oswald', sans-serif, 'Microsoft YaHei';
            .pl {
                visibility: hidden;
            }
            .l,
            .r {
                display: inline-block;
                white-space: nowrap;
                font-size: 60px;
            }
            .l {
                color: #090909;
                margin-right: 15px;
            }
            .r {
                z-index: 1;
                position: relative;
                background-color: #e62117;
                color: #ffffff;
                padding: 8px 15px 15px 15px;
                box-sizing: border-box;
                font-weight: bold;
                border-radius: 60px;
                span {
                    display: block;
                    min-width: 90px;
                }
                .lt,
                .lb,
                .rt,
                .rb {
                    z-index: -1;
                    position: absolute;
                    height: calc(50% + 1px);
                    pointer-events: none;
                }
                .lb {
                    transform: rotate(180deg) scaleX(-1);
                }
                .rb {
                    transform: rotate(180deg);
                }
                .rt {
                    transform: rotate(180deg) scaleY(-1);
                }
                .lt,
                .lb {
                    left: -10px;
                }
                .rt,
                .rb {
                    right: -10px;
                }
                .lt,
                .rt {
                    top: 0;
                }
                .lb,
                .rb {
                    bottom: 0;
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
