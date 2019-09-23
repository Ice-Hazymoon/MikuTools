<template>
    <div class="cyberpunk2077">
        <nya-container title="Cyberpunk 2077 图片制作">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    type="file"
                    accept="image/*"
                    label="请选择要制作的图片"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button
                    type="button"
                    class="nya-btn"
                    @click="save"
                >
                    保存
                </button>
            </div>
            <div class="nya-subtitle mt-15">
                选择 Logo 样式
            </div>
            <div class="radio-group">
                <nya-radio-group v-model="style">
                    <nya-radio class="mr-15" value="logo_en" label="英文" />
                    <nya-radio class="mr-15" value="logo_en_2" label="英文2" />
                    <nya-radio class="mr-15" value="logo_en_shadow" label="英文带阴影" />
                    <nya-radio class="mr-15" value="logo_cn" label="中文" />
                </nya-radio-group>
            </div>
        </nya-container>

        <nya-container v-show="n" title="预览">
            <div ref="box" class="box">
                <canvas ref="canvas"></canvas>
            </div>
        </nya-container>
    </div>
</template>

<script>
let fabric;
if (process.browser) {
    fabric = require('fabric').fabric;
}
import createDownload from '../utils/createDownload';
export default {
    name: 'Cyberpunk2077',
    data() {
        return {
            n: null,
            src: {
                logo_en: require('../assets/images/cyberpunk_2077_logo.png'),
                logo_en_2: require('../assets/images/cyberpunk_2077_logo_2.png'),
                logo_en_shadow: require('../assets/images/cyberpunk_2077_logo_shadow.png'),
                logo_cn: require('../assets/images/cyberpunk_2077_logo_cn.png')
            },
            style: 'logo_en',
            logo: null,
            backgroundImage: null,
            canvas: null
        };
    },
    head() {
        return this.$store.state.currentTool.head;
    },
    watch: {
        style() {
            if (this.n) this.renderCanvas();
        }
    },
    mounted() {
        this.canvas = new fabric.Canvas(this.$refs.canvas);
    },
    methods: {
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener(
                'load',
                async () => {
                    const image = new Image();
                    image.onload = () => {
                        this.backgroundImage = image;
                        this.$nextTick(this.renderCanvas);
                    };
                    image.src = reader.result;
                },
                false
            );
        },
        renderCanvas() {
            this.canvas.clear();
            const image = this.backgroundImage;

            const boxW = this.$refs.box.offsetWidth;
            let bgScale = 1;

            if (image.width > boxW) {
                this.canvas.setWidth(boxW);
                this.canvas.setHeight((boxW / image.width) * image.height);
                bgScale = boxW / image.width;
            } else {
                this.canvas.setWidth(image.width);
                this.canvas.setHeight(image.height);
            }

            this.getLogo().then(() => {
                let logoScale = image.width / 2 / this.logo.width;
                if (image.width > boxW) logoScale = boxW / 2 / this.logo.width;
                const logo = new fabric.Image(this.logo, {
                    scaleX: logoScale,
                    scaleY: logoScale,
                    left: 0,
                    top: 0
                });
                this.canvas.add(logo);
                logo.centerH();
                this.canvas.renderAll();
            });

            const backgroundImage = new fabric.Image(image, {
                scaleX: bgScale,
                scaleY: bgScale,
                left: 0,
                top: 0,
                selectable: false
            });
            this.canvas.setBackgroundImage(backgroundImage);
        },
        getLogo() {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    this.logo = image;
                    resolve(image);
                };
                image.onerror = reject;
                image.src = this.src[this.style];
            });
        },
        save() {
            if (!this.n) return false;
            this.canvas.lowerCanvasEl.toBlob(blob => {
                createDownload(URL.createObjectURL(blob), 'Cyberpunk_2077.png');
            });
        }
    }
};
</script>
