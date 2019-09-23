<template>
    <div class="gif_splitter">
        <nya-container title="GIF 分解">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    class="upfile"
                    type="file"
                    accept="image/*"
                    label="请选择要分解的GIF图片"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="start"
                >
                    {{ loading ? '分解中' : '开始分解' }}
                </button>
            </div>
        </nya-container>

        <nya-container v-if="results.length" title="分解成功" class="results">
            <div v-for="(item, index) in results" :key="index" class="image">
                <img :src="item" alt="">
            </div>
        </nya-container>
    </div>
</template>

<script>
import SuperGif from '../utils/libgif';
export default {
    name: 'GifSplitter',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            n: '',
            file: null,
            progress: '',
            loading: false,
            results: []
        };
    },
    methods: {
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            if (/gif$/.test(file.type)) {
                this.file = file;
            } else {
                this.$swal({
                    type: 'error',
                    title: '识别失败',
                    text: `ERROR: 该文件获取不是一张GIF图片`
                });
                this.n = null;
            }
        },
        start() {
            if (!this.file) return false;
            this.loading = true;
            this.results = [];
            this.progress = 'Loadging...';
            this.loadFile().then(gifImg => {
                const rub = new SuperGif({ gif: gifImg });
                const img_list = [];
                rub.load(() => {
                    for (let i = 1; i <= rub.get_length(); i++) {
                        rub.move_to(i);
                        img_list.push(rub.get_canvas().toDataURL());
                    }
                    this.results = img_list;
                    this.loading = false;
                });
            });
        },
        loadFile() {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.addEventListener('load', () => {
                    const gifImg = new Image();
                    gifImg.src = reader.result;
                    gifImg.setAttribute(
                        'rel:animated_src',
                        URL.createObjectURL(this.file)
                    );
                    gifImg.setAttribute('rel:auto_play', '0');
                    gifImg.addEventListener('load', () => {
                        resolve(gifImg);
                    });
                });
                reader.addEventListener('error', () => {
                    reject(reader.error);
                });
                reader.readAsDataURL(this.file);
            });
        }
    }
};
</script>

<style lang="scss">
.gif_splitter {
    .results {
        font-size: 0;
        .image {
            display: inline-block;
            width: calc(100% / 4);
            padding: 3px;
            box-sizing: border-box;
            @media (max-width: 600px) {
                width: calc(100% / 3);
            }
        }
        img {
            width: 100%;
        }
    }
}
</style>
