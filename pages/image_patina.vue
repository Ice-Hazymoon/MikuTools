<template>
    <div class="image_patina">
        <nya-container title="图片加包浆">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    class="upfile"
                    type="file"
                    accept="image/*"
                    label="请选择要处理的图片"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button
                    type="button"
                    class="nya-btn"
                    @click="download"
                >
                    {{ loading ? `${(progress / iterations * 100).toFixed(0)} %` : '保存' }}
                </button>
            </div>

            <div class="nya-subtitle">
                图片质量
            </div>
            <client-only>
                <vue-slider v-model="quality" lazy :min="0" :max="100" />
            </client-only>

            <nya-input
                v-model.trim="iterations"
                type="number"
                label="包浆次数"
                autocomplete="off"
                fullwidth
                @change="update"
            />
        </nya-container>

        <nya-container v-if="preview" title="预览">
            <div class="preview">
                <div>
                    <div class="nya-subtitle">
                        处理前
                    </div>
                    <img :src="preview" alt="image">
                </div>
                <div>
                    <div class="nya-subtitle">
                        处理后
                    </div>
                    <img :src="resultsImg" alt="image">
                </div>
            </div>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>为什么要写这个功能可以参考：<a href="https://www.zhihu.com/question/29345490" target="_blank" rel="noopener noreferrer">https://www.zhihu.com/question/29345490</a></li>
                <li>新做的表情包没人用？表情包没有年代感？这时即可使用本工具把图片做旧，让表情包看起来传播次数更多，更有收藏价值</li>
                <li>如果处理时间过长或处理失败，请使用其他浏览器，推荐使用 Chrome</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
let VueSlider;
import 'vue-slider-component/theme/default.css';
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
import createDownload from '~/utils/createDownload';
export default {
    name: 'ImagePatina',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        VueSlider
    },
    data() {
        return {
            n: null,
            file: null,
            progress: 0, // 处理进度
            iterations: 16, // 处理次数
            quality: 75, // 质量
            image: null, //图片对象
            preview: '', //预览图(处理前)
            resultsImg: '', // 结果图片
            loading: false // 等待中
        };
    },
    computed: {},
    watch: {
        quality() {
            this.resetProcess();
        }
    },
    mounted() {
        this.cover();
    },
    methods: {
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            this.file = file;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener(
                'load',
                () => {
                    this.preview = reader.result;
                    this.resetProcess();
                },
                false
            );
        },
        download() {
            if (this.image.src) {
                const dotIndex = this.n.lastIndexOf('.');
                const dname =
                    (dotIndex == -1 ? this.n : this.n.substring(0, dotIndex)) +
                    (this.quality <= 100 ? '_JPEGreen.jpg' : '_JPEGreen.png');
                createDownload(this.image.src, dname);
            }
        },
        cover() {
            this.image = new Image();
            this.image.addEventListener('load', () => {
                requestAnimationFrame(this.processImage);
            });
        },
        update() {
            if (this.progress <= this.iterations) {
                requestAnimationFrame(this.processImage);
            } else {
                this.resetProcess();
            }
        },
        resetProcess() {
            this.progress = 0;
            this.image.src = this.preview;
        },
        processImage() {
            this.loading = true;
            const clamp = x => (x >= 0 ? (x <= 255 ? x : 255) : 0);
            const clampuv = x => (x >= -128 ? (x <= 127 ? x : 127) : -128);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (this.progress == this.iterations) {
                this.loading = false;
                return;
            }
            ++this.progress;
            canvas.width = this.image.width;
            canvas.height = this.image.height;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.image.width, this.image.height);
            ctx.drawImage(this.image, 0, 0);
            const imageData = ctx.getImageData(
                0,
                0,
                this.image.width,
                this.image.height
            );
            const data = imageData.data;
            for (let p = 0; p < data.length / 4; ++p) {
                const r = data[p * 4];
                const g = data[p * 4 + 1];
                const b = data[p * 4 + 2];
                const y = clamp((77 * r + 150 * g + 29 * b) >> 8);
                const u = clampuv(((-43 * r - 85 * g + 128 * b) >> 8) - 1);
                const v = clampuv(((128 * r - 107 * g - 21 * b) >> 8) - 1);
                const r1 = clamp((65536 * y + 91881 * v) >> 16);
                const g1 = clamp((65536 * y - 22553 * u - 46802 * v) >> 16);
                const b1 = clamp((65536 * y + 116130 * u) >> 16);
                data[p * 4] = r1;
                data[p * 4 + 1] = g1;
                data[p * 4 + 2] = b1;
            }
            ctx.putImageData(imageData, 0, 0);
            const dataURL =
                this.quality <= 100
                    ? canvas.toDataURL('image/jpeg', this.quality * 0.01)
                    : canvas.toDataURL('image/png');
            this.resultsImg = dataURL;
            this.image.src = dataURL;
        }
    }
};
</script>

<style lang="scss">
.image_patina {
    .nya-subtitle {
        margin-top: 15px;
    }
    .vue-slider {
        margin-bottom: 15px;
    }
    .preview {
        width: 100%;
        font-size: 0;
        display: flex;
        justify-content: space-between;
        .nya-subtitle {
            padding: 0;
        }
        div {
            width: 50%;
            padding: 0 20px;
            box-sizing: border-box;
            display: inline-block;
        }
        @media (max-width: 600px) {
            div {
                width: 100%;
                display: block;
            }
            display: block;
        }
        img {
            width: 100%;
        }
    }
}
</style>
