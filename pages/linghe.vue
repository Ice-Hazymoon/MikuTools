<template>
    <div class="linghe">
        <nya-container title="令和元号举牌图片生成">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="text"
                    label="请输入文字"
                    placeholder="令和"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="create"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="create"
                >
                    {{ loading ? '生成中' : '开始生成' }}
                </button>
            </div>

            <nya-input
                v-model="n"
                class="upfile"
                type="file"
                accept="image/*"
                label="添加背景图片"
                placeholder="点击这里上传文件"
                fullwidth
                @change="handleChange"
            />

            <nya-checkbox v-model="vertical" label="使用竖版文字" />
            <br>
            <nya-checkbox v-model="bold" label="加粗" />

            <div class="nya-subtitle">
                字体大小
            </div>
            <client-only>
                <vue-slider v-model="fontSize" lazy :min="30" :max="150" />
            </client-only>

            <div class="nya-subtitle">
                文字颜色
            </div>
            <client-only>
                <compact-picker v-model="colors" @input="updateColor" />
            </client-only>

            <div class="nya-subtitle">
                预览
            </div>
            <div ref="preview" class="box">
                <img src="~/assets/images/linghe.png" alt="linghe">
                <div class="text" :style="style">
                    {{ text }}
                </div>
            </div>
        </nya-container>

        <nya-container v-if="results" title="生成成功">
            <img :src="results" alt="results">
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li><b>如果你看到的文字不是书法字体，请等待1分钟左右，或更换浏览器使用</b></li>
                <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 <b>Chrome</b></li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import 'vue-slider-component/theme/default.css';
import { Compact } from 'vue-color';
import domtoimage from 'dom-to-image';
import createDownload from '~/utils/createDownload.js';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
export default {
    name: 'Linghe',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'compact-picker': Compact,
        VueSlider
    },
    data() {
        return {
            n: '',
            text: '',
            fontSize: 110,
            colors: '',
            color: '#242424',
            vertical: true,
            bold: true,
            results: '',
            file: null,
            bgimg: '',
            loading: false
        };
    },
    computed: {
        style() {
            return {
                'font-size': `${this.fontSize}px`,
                color: this.color,
                'writing-mode': this.vertical ? 'vertical-rl' : 'inherit',
                'font-weight': this.bold ? 'bold' : 'inherit',
                'background-image': `url(${this.bgimg})`
            };
        }
    },
    mounted() {
        if (window.innerWidth < 650) {
            this.fontSize = 50;
        }
    },
    methods: {
        create() {
            if (this.loading) return false;
            this.loading = true;
            this.results = '';
            domtoimage
                .toPng(this.$refs.preview)
                .then(e => {
                    this.results = e;
                    this.loading = false;
                    createDownload(e, 'linghe.png');
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
            this.color = val.hex;
        },
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            this.file = files[0];
            this.bgimg = URL.createObjectURL(this.file);
        }
    }
};
</script>

<style lang="scss">
@font-face {
    font-family: shufa;
    src: url('../assets/fonts/linghe.ttf');
}
.linghe {
    .nya-subtitle,
    .nya-input,
    .nya-checkbox {
        margin-top: 15px;
    }
    .box {
        width: 600px;
        max-width: 100%;
        position: relative;
        font-family: shufa;
        background-color: #d3dae2;
        font-size: 0;
        .text {
            width: 32%;
            height: 56.5%;
            position: absolute;
            transform: rotate(-3.5deg);
            left: 11.5%;
            top: 6.8%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
        img {
            pointer-events: none;
            width: 100%;
        }
    }
}
</style>
