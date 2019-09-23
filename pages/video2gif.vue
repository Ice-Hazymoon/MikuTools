<template>
    <div class="video2gif">
        <nya-container title="视频转GIF">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    class="upfile"
                    type="file"
                    accept=".mp4, .ogg, .webm"
                    label="请选择要转换的视频文件"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="convert"
                >
                    {{ loading ? '转换中' : '开始转换' }}
                </button>
            </div>
            <div v-if="progress" class="progress">
                <div class="nya-subtitle">
                    进度
                </div>
                {{ progress }}
            </div>
            <div v-if="videoUrl" class="videoUrl">
                <div class="nya-subtitle">
                    预览
                </div>
                <video :src="videoUrl" controls preload></video>
            </div>
        </nya-container>

        <nya-container v-if="results" title="转换成功">
            <a :href="results" target="_blank" rel="noopener noreferrer">
                <img :src="results" alt="gif">
            </a>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>全部转换均在浏览器内进行，不会消耗设备流量</li>
                <li>如果转换时间过长请使用其他浏览器尝试，推荐使用Chrome</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import GIF from 'gif.js';

export default {
    name: 'Video2gif',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            n: null,
            results: '',
            videoUrl: '',
            file: null,
            progress: null,
            videoWidth: 800,
            loading: false
        };
    },
    methods: {
        reset() {
            this.progress = null;
            this.loading = false;
            (this.file = null), (this.results = '');
            this.videoUrl = null;
            this.n = null;
        },
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            this.file = file;
            this.videoUrl = URL.createObjectURL(file);
        },
        async convert() {
            this.loading = true;
            const video = await this.createVideo(this.videoUrl);
            const time = video.duration;
            let flag = true;
            if (time > 30) {
                flag = confirm(
                    '当前视频长度大于一分钟，如果继续转换可能会导致电脑的性能占用过高，是否继续'
                );
            }
            if (flag) {
                const blob = await this.encodeGIF(video);
                const gifUrl = URL.createObjectURL(blob);
                this.results = gifUrl;
                this.loading = false;
            } else {
                this.reset();
            }
        },
        createVideo(url) {
            const video = document.createElement('video');
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.src = url;
            video.width = this.videoWidth;
            this.progress = `Loading video..`;
            return new Promise((resolve, reject) => {
                video.onerror = reject;
                video.addEventListener('loadeddata', () => resolve(video));
            });
        },
        async encodeGIF(video) {
            this.progress = 'Converting..';
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = (canvas.width =
                this.videoWidth > video.videoWidth
                    ? video.videoWidth
                    : this.videoWidth);
            const widthRatio = width / video.videoWidth;
            let height = (canvas.height = widthRatio * video.videoHeight);
            if (width / 500 > 1) {
                height = height / (width / 500);
                width = 500;
            }
            const gif = new GIF({
                width,
                height,
                workers: 4,
                workerScript: '/js/gif.worker.js'
            });
            return new Promise((resolve, reject) => {
                let lastTime = video.currentTime;
                let lastPixels;
                const capture = () => {
                    ctx.drawImage(video, 0, 0, width, height);
                    const pixels = ctx.getImageData(0, 0, width, height);
                    const duration = video.currentTime - lastTime;
                    this.progress = `Reading Video ${((video.currentTime /
                        video.duration) *
                        100) |
                        0}%..`;
                    if (!lastPixels || !isSameFrame(lastPixels, pixels)) {
                        lastPixels = pixels;
                        lastTime = video.currentTime;
                        gif.addFrame(canvas, {
                            copy: true,
                            delay: duration * 1000
                        });
                    }
                    if (!video.ended) {
                        requestAnimationFrame(capture);
                    } else {
                        gif.render();
                    }
                };
                requestAnimationFrame(capture);
                gif.on('finished', blob => {
                    resolve(blob);
                });
                gif.on('progress', p => {
                    this.progress = `Converting ${(p * 100) | 0}%..`;
                });
                video.play();
                video.onerror = reject;
            });
        }
    }
};
function isSameFrame(a, b) {
    if (a.data.length !== b.data.length) {
        return false;
    }
    const max = a.data.length;
    for (let i = 0; i < max; i++) {
        if (a.data[i] !== b.data[i]) {
            return false;
        }
    }
    return true;
}
</script>

<style lang="scss">
.video2gif {
    img {
        max-width: 100%;
    }
    .videoUrl {
        margin-top: 15px;
        video {
            max-width: 100%;
        }
    }
    .progress {
        margin-top: 15px;
    }
}
</style>
