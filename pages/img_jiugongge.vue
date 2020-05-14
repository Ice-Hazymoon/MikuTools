<template>
    <div class="img_jiugongge">
        <nya-container title="九宫格切图">
            <nya-input
                v-model="n"
                fullwidth
                class="mb-15"
                type="file"
                accept="image/*"
                label="请选择要切割的图片"
                placeholder="点击这里上传文件"
                @change="handleChange"
            />
            <nya-input
                v-model.trim="row"
                fullwidth
                class="mb-15"
                type="number"
                label="行数"
                autocomplete="off"
            />
            <nya-input
                v-model.trim="col"
                fullwidth
                class="mb-15"
                type="number"
                label="列数"
                autocomplete="off"
            />
            <nya-checkbox v-model="source" label="显示原图" />
        </nya-container>
        <nya-container v-if="results.length" title="预览">
            <div :style="resultsStyle" class="results">
                <img v-for="(src,index) in results" :key="index" :src="src" alt="结果" />
            </div>
            <img v-if="source" :src="image.src" alt="原图" />
        </nya-container>
    </div>
</template>
<script>
export default {
    data: () => ({
        n: '',
        row: 3,
        col: 3,
        source: false,
        image: {},
        results: []
    }),
    computed: {
        resultsStyle() {
            const width = `width: ${this.image.width || 800}px;`;
            const grid = `grid: repeat(${this.row}, 1fr) / repeat(${
                this.col
            }, 1fr);`;
            return width + grid;
        }
    },
    watch: {
        resultsStyle() {
            if (this.n) this.start();
        }
    },
    methods: {
        handleChange({ target }) {
            const files = target.files;
            if (!files.length) {
                this.results = [];
                this.image = {};
                return;
            }
            const file = files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener(
                'load',
                async () => {
                    const image = new Image();
                    image.onload = () => {
                        this.image = image;
                        this.start();
                    };
                    image.src = reader.result;
                },
                false
            );
        },
        start() {
            const row = this.val(this.row);
            const col = this.val(this.col);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = this.image;

            const wpiece = Math.floor(img.naturalWidth / col);
            const hpiece = Math.floor(img.naturalHeight / row);
            const results = [];

            canvas.width = wpiece;
            canvas.height = hpiece;

            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    ctx.drawImage(
                        img,
                        c * wpiece,
                        r * hpiece,
                        wpiece,
                        hpiece,
                        0,
                        0,
                        wpiece,
                        hpiece
                    );
                    results.push(canvas.toDataURL());
                }
            }
            this.results = results;
        },
        val(i) {
            return i > 0 ? i : 1;
        }
    }
};
</script>

<style lang="scss">
.img_jiugongge {
    .results {
        display: grid;
        grid-gap: 1px;
        max-width: 100%;
    }
}
</style>
