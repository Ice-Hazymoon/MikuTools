<template>
    <div class="watermark">
        <nya-container title="图片加水印">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    class="upfile"
                    type="file"
                    accept="image/*"
                    label="请选择要添加水印的图片"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="addWatermark"
                >
                    {{ loading ? '处理中' : '开始处理' }}
                </button>
            </div>
            <nya-input
                v-model.trim="options.text"
                label="请输入水印文字"
                placeholder="Hello MikuTools"
                autocomplete="off"
                autofocus
                fullwidth
            />

            <div class="nya-subtitle">
                字体大小
            </div>
            <client-only>
                <vue-slider v-model="options.fontSize" lazy :min="10" :max="30" />
            </client-only>

            <div class="nya-subtitle">
                透明度
            </div>
            <client-only>
                <vue-slider v-model="options.alpha" lazy :min="0" :max="10" />
            </client-only>

            <div class="nya-subtitle">
                旋转角度
            </div>
            <client-only>
                <vue-slider v-model="options.rotate" lazy :min="0" :max="360" />
            </client-only>

            <div class="nya-subtitle">
                文本间距
            </div>
            <client-only>
                <vue-slider v-model="options.width" lazy :min="0" :max="100" />
            </client-only>

            <div class="nya-subtitle">
                文字颜色
            </div>
            <client-only>
                <compact-picker v-model="colors" @input="updateColor" />
            </client-only>

            <div v-if="preview" class="nya-subtitle">
                预览
            </div>
            <div v-if="preview" ref="preview" class="preview">
                <img :src="preview" alt="preview">
                <div class="watermark" :style="{ background: `url(${svg})` }"></div>
            </div>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li><b>主要用于某些需要实名认证的情况下，避免将您的一些信息泄露出去</b></li>
                <li><b>全部过程均在本地进行，不会在云端存储您的任何信息</b></li>
                <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 Chrome</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import createDownload from '~/utils/createDownload.js';
import domtoimage from 'dom-to-image';
import 'vue-slider-component/theme/default.css';
import { Compact } from 'vue-color';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
export default {
    name: 'Watermark',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'compact-picker': Compact,
        VueSlider
    },
    data() {
        return {
            colors: '#000000',
            results: '',
            preview: '',
            loading: false,
            options: {
                fontSize: 13,
                text: '仅供 xxx 验证使用',
                alpha: 5,
                color: '#000000',
                rotate: 23,
                width: 10
            },
            n: null,
            watermark: null
        };
    },
    computed: {
        svg() {
            let width =
                this.options.fontSize * this.options.text.split('').length;
            width = width + (this.options.width / 100) * width;

            let svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${width}px">
                <text x="50%" y="50%"
                    alignment-baseline="middle"
                    text-anchor="middle"
                    stroke="${this.options.color}"
                    opacity="${this.options.alpha / 10}"
                    transform="translate(${width / 2}, ${width / 2}) rotate(${
                this.options.rotate
            }) translate(-${width / 2}, -${width / 2})"
                    font-weight="100"
                    font-size="${this.options.fontSize}"
                    font-family="microsoft yahe"
                    >
                    ${this.options.text}
                </text>
            </svg>`;
            return (
                'data:image/svg+xml;base64,' +
                Buffer.from(svgText).toString('base64')
            );
        }
    },
    methods: {
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            this.file = files[0];
            this.docs = [];
            this.preview = URL.createObjectURL(this.file);
        },
        addWatermark() {
            this.loading = true;
            domtoimage
                .toPng(this.$refs.preview)
                .then(e => {
                    this.results = e;
                    this.loading = false;
                    createDownload(e, 'watermark.png');
                })
                .catch(err => {
                    this.loading = false;
                    this.$swal({
                        type: 'error',
                        title: '生成失败',
                        text: err
                    });
                });
        },
        updateColor(val) {
            this.options.color = val.hex8;
        }
    }
};
</script>

<style lang="scss">
.watermark {
    .nya-subtitle {
        margin-top: 15px;
    }
    .preview {
        position: relative;
        max-width: 800px;
        img {
            width: 100%;
            height: 100%;
        }
        .watermark {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .results {
        max-width: 100%;
    }
    .inputbtn {
        margin-bottom: 15px;
    }
}
</style>
