<template>
    <div class="acg_meme">
        <client-only>
            <modal name="rbq" classes="rbq_modal" height="auto" width="400">
                <div class="title">
                    生成成功，如果长时间没有下载请自行<b>长按图片</b>保存
                </div>
                <img v-if="results" :src="results" alt="rbq">
            </modal>
        </client-only>
        <nya-container title="ACG表情包制作">
            <nya-input
                v-model.trim="text"
                label="请输入文字内容"
                placeholder="啥百度啊"
                autocomplete="off"
                autofocus
                fullwidth
            />
            <div class="checkbox">
                <nya-checkbox v-model="options.bold" label="加粗" />
                <nya-checkbox v-model="options.italic" label="斜体" />
                <nya-checkbox v-model="options.center" label="居中" />
            </div>

            <div class="nya-subtitle">
                字体大小
            </div>
            <client-only>
                <vue-slider v-model="options.fontSize" lazy :min="15" :max="30" />
            </client-only>

            <div class="nya-subtitle">
                文本间距
            </div>
            <client-only>
                <vue-slider v-model="options.letterSpacing" lazy :min="0" :max="10" />
            </client-only>

            <div class="nya-subtitle">
                文字颜色
            </div>
            <client-only>
                <compact-picker v-model="colors" @input="updateColor" />
            </client-only>
        </nya-container>

        <nya-container title="表情包预览">
            <div v-if="!loadAll" class="load-all">
                <div class="nya-btn" @click="loadAll = true">
                    加载模板
                </div>
                <span>加载全部模板可能会消耗一定的流量</span>
            </div>
            <client-only v-else>
                <ul class="template-list">
                    <li v-for="(item, index) in templateFiles" :key="index">
                        <div class="box">
                            <div :id="'_rbq_' + item" :ref="item" class="rbq-box">
                                <img v-lazy="cdnurl + item" :alt="getPixivId(item)">
                                <div class="text" :style="styles">
                                    {{ text }}
                                </div>
                            </div>
                            <div class="generate">
                                <a class="info" :href="'https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+getPixivId(item)" target="_blank" rel="noopener noreferrer" title="前往pixiv查看">
                                    <i class="eva eva-external-link-outline"></i>
                                </a>
                                <i class="eva eva-download-outline download" title="下载" @click="generate(item)"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </client-only>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>图片来自：<a href="https://www.pixiv.net/member.php?id=27304867" target="_blank" rel="noopener noreferrer">長門ちゃん（Pixiv）</a></li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import createDownload from '~/utils/createDownload.js';
import { Compact } from 'vue-color';
import 'vue-slider-component/theme/default.css';
let VueSlider, html2canvas;
if (process.browser) {
    VueSlider = require('vue-slider-component');
    html2canvas = require('html2canvas');
}
export default {
    name: 'AcgMeme',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'compact-picker': Compact,
        VueSlider
    },
    data() {
        return {
            cdnurl: '/acg_meme/',
            text: '啥百度啊',
            results: '',
            loadAll: false,
            templateFiles: [
                '64679775_p0.jpg',
                '64679775_p1.jpg',
                '64679810_p0.jpg',
                '64679810_p1.jpg',
                '64679842_p0.jpg',
                '64679842_p1.jpg',
                '64679842_p2.jpg',
                '64679869_p0.jpg',
                '64679869_p1.jpg',
                '64679869_p2.jpg',
                '64679932_p0.jpg',
                '64679973_p0.jpg',
                '64679973_p1.jpg',
                '64679990_p0.jpg',
                '64680126_p0.jpg',
                '64680126_p1.jpg',
                '64693222_p0.jpg',
                '64693222_p1.jpg',
                '64695668_p0.jpg',
                '64695748_p0.jpg',
                '64713015_p0.jpg',
                '64713015_p1.jpg',
                '64713015_p2.jpg',
                '64734083_p0.jpg',
                '64764795_p0.jpg',
                '64764795_p1.jpg',
                '64767804_p0.jpg',
                '64767821_p0.jpg',
                '64767821_p1.jpg',
                '64767821_p2.jpg',
                '64767821_p3.jpg',
                '64786175_p0.jpg',
                '64801252_p0.jpg',
                '64867053_p0.jpg',
                '64867053_p1.jpg',
                '64954322_p0.jpg',
                '64954322_p1.jpg',
                '65007077_p0.jpg',
                '65205233_p0.jpg',
                '65256166_p0.jpg',
                '65256166_p1.jpg',
                '65322015_p0.jpg',
                '65447634_p0.jpg',
                '65513265_p0.jpg',
                '65649172_p0.jpg',
                '66159858_p0.jpg',
                '66159858_p1.jpg',
                '66196713_p0.jpg',
                '66380379_p0.jpg',
                '66380379_p1.jpg',
                '66800288_p0.jpg',
                '67504341_p0.jpg',
                '67798259_p0.jpg',
                '67844832_p0.jpg',
                '68055668_p0.jpg',
                '68055668_p1.jpg',
                '68071379_p0.jpg',
                '68085680_p0.jpg',
                '68085680_p1.jpg',
                '68343677_p0.jpg',
                '68343677_p1.jpg',
                '68343677_p2.jpg',
                '68367629_p0.jpg',
                '68367629_p1.jpg',
                '68367629_p2.jpg',
                '68882965_p0.jpg',
                '68882965_p1.jpg',
                '69130825_p0.jpg',
                '69130825_p1.jpg',
                '69168247_p0.jpg',
                '69168247_p1.jpg',
                '69213542_p0.jpg',
                '69213542_p1.jpg',
                '69241770_p0.jpg',
                '69241770_p1.jpg',
                '69241770_p2.jpg',
                '69257852_p0.jpg',
                '69333159_p0.jpg',
                '69507340_p0.jpg',
                '69507340_p1.jpg',
                '69606684_p0.jpg',
                '69742579_p0.jpg',
                '69848024_p0.jpg',
                '69848024_p1.jpg',
                '69942522_p0.jpg',
                '69942522_p1.jpg',
                '69942522_p2.jpg',
                '69942522_p3.jpg',
                '70079464_p0.jpg',
                '70236910_p0.jpg',
                '70434574_p0.jpg',
                '70434574_p1.jpg',
                '70538322_p0.jpg',
                '70724191_p0.jpg',
                '70724191_p1.jpg',
                '70758093_p0.jpg',
                '70758093_p1.jpg',
                '70929012_p0.jpg',
                '70929012_p1.jpg',
                '70929012_p2.jpg',
                '70929012_p3.jpg',
                '71115059_p0.jpg',
                '71286370_p0.jpg',
                '71286370_p1.jpg',
                '71286370_p2.jpg',
                '71286370_p3.jpg',
                '71286370_p4.jpg',
                '71286370_p5.jpg',
                '71498875_p0.jpg',
                '71559902_p0.jpg',
                '71559902_p1.jpg',
                '71760027_p0.jpg',
                '71760027_p1.jpg',
                '71760027_p2.jpg',
                '71945413_p0.jpg',
                '71945413_p1.jpg',
                '71945413_p2.jpg',
                '71945413_p3.jpg',
                '72268793_p0.jpg',
                '72562357_p0.jpg',
                '72562357_p1.jpg',
                '72562357_p2.jpg',
                '73063317_p0.jpg',
                '73063317_p1.jpg',
                '73063317_p2.jpg',
                '73234337_p0.jpg',
                '73234337_p1.jpg',
                '73234337_p2.jpg',
                '73558922_p0.jpg',
                '73558922_p1.jpg',
                '73558922_p2.jpg',
                '73558922_p3.jpg',
                '73558922_p4.jpg',
                '73558922_p5.jpg',
                '73558922_p6.jpg',
                '73604903_p0.jpg',
                '73604903_p1.jpg',
                '73610458_p0.jpg',
                '73610458_p1.jpg',
                '73708980_p0.jpg',
                '73708980_p1.jpg',
                '73708980_p2.jpg',
                '74135488_p0.jpg',
                '74135488_p1.jpg'
            ],
            colors: '#000',
            options: {
                center: true,
                italic: false,
                bold: true,
                fontSize: 20,
                letterSpacing: 1,
                color: '#000'
            }
        };
    },
    computed: {
        styles() {
            let o = {};
            if (this.options.center) {
                o['text-align'] = 'center';
            }
            if (this.options.italic) {
                o['font-style'] = 'italic';
            }
            if (this.options.bold) {
                o['font-weight'] = 'bold';
            }
            o['color'] = this.options.color;
            o['letter-spacing'] = this.options.letterSpacing + 'px';
            o['font-size'] = this.options.fontSize + 'px';
            return o;
        }
    },
    mounted() {
        if (process.browser) {
            if (window.innerWidth < 400) {
                this.options.fontSize = 15;
            }
        }
    },
    methods: {
        generate(item) {
            this.$store.commit('SET_STORE', {
                key: 'globalLoading',
                value: true
            });
            html2canvas(this.$refs[item][0], {
                useCORS: true,
                logging: false,
                scale: 2.5
            })
                .then(e => {
                    this.$store.commit('SET_STORE', {
                        key: 'globalLoading',
                        value: false
                    });
                    createDownload(e.toDataURL(), 'rbq.png');
                })
                .catch(err => {
                    this.$store.commit('SET_STORE', {
                        key: 'globalLoading',
                        value: false
                    });
                    this.$swal({
                        type: 'error',
                        title: '生成失败',
                        text: err
                    });
                });
        },
        getPixivId(filename) {
            return filename.match(/^[0-9]+/)[0];
        },
        updateColor(val) {
            this.options.color = val.hex;
        }
    }
};
</script>

<style lang="scss">
.acg_meme {
    .load-all {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 30px auto;
        span {
            margin-top: 10px;
            color: var(--theme);
        }
    }
    .rbq_modal {
        max-width: 100%;
        border-radius: 5px;
        background-color: var(--t2);
        box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
        font-size: 0;
        .title {
            text-align: center;
            font-size: 16px;
            margin: 15px;
        }
        img {
            width: 100%;
        }
    }
    .nya-subtitle,
    .checkbox {
        margin-top: 15px;
    }
    .template-list {
        margin: 0;
        padding: 0;
        li {
            position: relative;
            list-style: none;
            display: inline-block;
            width: calc(100% / 6);
            padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
            font-size: 0;
            margin: 0;
            img {
                width: 100%;
            }
            .generate {
                z-index: 1;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba($color: #000000, $alpha: 0.6);
                transition: opacity 0.3s ease;
                text-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0.3);
                .info {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    border-radius: 50%;
                    display: flex;
                    font-size: 16px;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                }
                i {
                    cursor: pointer;
                    color: #ffffff;
                }
                .download {
                    font-size: 30px;
                }
            }
            .box {
                position: relative;
            }
            .text {
                background-color: #fff;
                padding: 5px;
                box-sizing: border-box;
            }
            &:hover {
                .generate {
                    opacity: 1;
                }
            }
            @media (max-width: 980px) {
                width: calc(100% / 5);
            }
            @media (max-width: 780px) {
                width: calc(100% / 4);
                .generate {
                    opacity: 1;
                    background-color: transparent;
                    align-items: flex-start;
                    justify-content: space-between;
                    .info {
                        position: static;
                        display: block;
                    }
                    i {
                        font-size: 18px !important;
                        padding: 5px;
                        box-sizing: border-box;
                        background-color: rgba($color: #000000, $alpha: 0.3);
                    }
                }
            }
            @media (max-width: 580px) {
                width: calc(100% / 3);
                padding: 8px;
            }
        }
    }
}
</style>
