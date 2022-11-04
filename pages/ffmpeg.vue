<template>
    <div class="ffmpeg">
        <nya-container title="媒体格式转换">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    class="upfile"
                    type="file"
                    label="请选择要转换的媒体文件"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button
                    @click="convert"
                    type="button"
                    class="nya-btn"
                    :disabled="loading || !file"
                >
                    {{ loading ? '加载中' : '开始转换' }}
                </button>
            </div>
            <div class="typeList">
                <nya-select
                    v-model="type"
                    fullwidth
                    :items="typeList"
                    :disabled="loading"
                    label="选择格式"
                />
            </div>
        </nya-container>

        <nya-container v-if="resultVideoUrl" title="转换成功">
            <div class="result">
                <video :src="resultVideoUrl" controls preload></video>
            </div>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>全部转换均在浏览器内进行，不会消耗设备流量</li>
                <li>如果转换时间过长请使用其他浏览器尝试，推荐使用Chrome</li>
                <li>
                    基于<a
                        target="_blank"
                        href="https://github.com/ffmpegwasm/ffmpeg.wasm"
                        >ffmpeg.wasm</a
                    >
                </li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
});
export default {
    name: 'ffmpeg',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            n: null,
            file: null,
            loading: true,
            type: 'MP4',
            typeList: {
                MP4: 'MP4',
                AVI: 'AVI',
                MOV: 'MOV',
                WEBM: 'WEBM',
            },
            resultVideoUrl: '',
            resultVideoName: '',
        };
    },
    computed: {
        outputName() {
            if (this.file) {
                const { name } = this.file;
                let [_, ...noExtname] = name.split('.').reverse();
                return `${noExtname.join('.')}.${this.type.toLowerCase()}`;
            }
            return '';
        },
    },
    async mounted() {
        await ffmpeg.load();
        this.loading = false;
    },
    methods: {
        handleChange({ target }) {
            if (target.files.length) {
                this.file = target.files[0];
            }
        },
        async convert() {
            this.loading = true;
            const { name } = this.file;
            const type = this.type.toLowerCase()
            ffmpeg.FS('writeFile', name, await fetchFile(this.file));
            this.resultVideoName = this.outputName;
            await ffmpeg.run('-i', name, this.resultVideoName);
            const data = ffmpeg.FS('readFile', this.resultVideoName);
            this.resultVideoUrl = URL.createObjectURL(
                new Blob([data.buffer], { type: `video/${type}` })
            );
            this.loading = false;
        },
    },
};
</script>

<style lang='scss'>
.ffmpeg {
    .typeList {
        margin-top: 15px;
    }
    .progress {
        margin-top: 15px;
    }
}
</style>
