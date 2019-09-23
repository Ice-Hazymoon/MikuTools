<template>
    <div class="color">
        <nya-container title="颜色转换">
            <nya-input
                v-model="colorVal"
                label="输入颜色代码"
                placeholder="#ffffff"
                autocomplete="off"
                autofocus
                fullwidth
                @input="handleColorVal"
            />
            <client-only>
                <slider-picker :value="colors" @input="updateColor" />
            </client-only>
            <client-only>
                <vue-slider v-model="alpha" :interval="0.1" lazy :min="0" :max="1" @change="updateAlpha" />
            </client-only>
            <nya-input
                v-model="n"
                type="file"
                accept="image/*"
                label="请选择要提取主色的图片"
                placeholder="点击这里上传文件"
                fullwidth
                @change="handleChange"
            />
            <div v-if="preview" class="preview">
                <div class="nya-subtitle">
                    预览
                </div>
                <img :src="preview" alt="preview">
            </div>
            <div v-if="preview" class="img-colors">
                <div class="img-color">
                    <div class="nya-subtitle">
                        主色
                    </div>
                    <div :style="{'background-color': imgColor.color}">
                        {{ imgColor.color }}
                    </div>
                </div>
                <div class="img-palette">
                    <div class="nya-subtitle">
                        调色盘
                    </div>
                    <ul>
                        <li v-for="(item, index) in imgColor.palette" :key="index" :style="{'background-color': item}">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </nya-container>

        <nya-container v-if="colors" title="结果">
            <div class="text" :style="{color: colors}">
                文字效果
            </div>
            <p v-for="(item, index) in handleColor" :key="index">
                <b>{{ index }}：</b><span>{{ item }}</span>
            </p>
        </nya-container>
    </div>
</template>

<script>
import { Slider } from 'vue-color';
import TinyColor from 'tinycolor2';
import colorThief from '~/utils/color-thief.js';
import 'vue-slider-component/theme/default.css';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
export default {
    name: 'Color',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'slider-picker': Slider,
        VueSlider
    },
    data() {
        return {
            colorVal: '',
            n: null,
            file: null,
            colors: '#00ADB5',
            alpha: 1,
            preview: '',
            results: '',
            imgColor: {
                color: '',
                palette: ''
            },
            requestIn: false,
            colorthief: new colorThief()
        };
    },
    computed: {
        handleColor() {
            const color = TinyColor(this.colors);
            return {
                'RGB(A)': color.toString('rgb').toUpperCase(),
                HEX6: color.toHexString().toUpperCase(),
                HEX8: color.toHex8String().toUpperCase(),
                'HSL(A)': color.toString('hsl').toUpperCase(),
                'HSV(A)': color.toString('hsv').toUpperCase()
            };
        }
    },
    watch: {
        colors(val) {
            const color = TinyColor(val);
            this.alpha = color.getAlpha();
        }
    },
    methods: {
        updateAlpha() {
            const color = TinyColor(this.colors);
            color.setAlpha(this.alpha);
            this.colors = color.toHex8String();
        },
        updateColor(val) {
            const color = TinyColor(val.hex);
            color.setAlpha(this.alpha);
            this.colors = color.toHex8String();
        },
        handleChange(e) {
            if (this.requestIn) return false;
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            this.requestIn = true;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener(
                'load',
                async () => {
                    this.preview = reader.result;
                    const img = new Image();
                    img.onload = () => {
                        const imgPalette = this.colorthief
                            .getPalette(img)
                            .map(color => {
                                return TinyColor(
                                    `rgb(${color.toString()})`
                                ).toHexString();
                            });
                        const imgColor = TinyColor(
                            `rgb(${this.colorthief.getColor(img).toString()})`
                        ).toHexString();
                        this.imgColor.palette = imgPalette;
                        this.imgColor.color = imgColor;
                        this.colors = imgColor;
                        this.requestIn = false;
                    };
                    img.src = this.preview;
                },
                false
            );
        },
        handleColorVal(val) {
            const color = TinyColor(val);
            if (color.isValid()) {
                this.colors = color.toHex8String();
            }
        }
    }
};
</script>

<style lang="scss">
.color {
    .vc-slider,
    .nya-input,
    .img-colors,
    .preview,
    .vue-slider {
        margin-bottom: 15px;
    }
    .vc-slider {
        width: 100%;
    }
    .img-colors {
        .img-color {
            div:not(.nya-subtitle) {
                padding: 10px;
                display: inline-block;
                color: #ffffff;
                text-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.2);
            }
        }
        .img-palette {
            margin-top: 15px;
            ul {
                padding: 0;
                margin: 0;
            }
            li {
                margin: 0;
                display: inline-block;
                font-size: 16px;
                box-sizing: border-box;
                padding: 10px;
                text-align: center;
                color: #ffffff;
                text-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.2);
                @media (max-width: 850px) {
                    width: 30%;
                }
            }
        }
    }
    .preview {
        font-size: 0;
        img {
            width: 300px;
            max-width: 100%;
        }
    }
}
</style>
