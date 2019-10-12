<template>
    <div class="screen_record">
        <nya-container title="屏幕录制">
            <nya-select v-model="aspectRatio" fullwidth :items="aspectRatioList" label="选择长宽比" />
            <nya-select v-model="frameRate" fullwidth :items="frameRateList" label="选择帧率" />
            <nya-select v-model="resolutions" fullwidth :items="resolutionsList" label="选择分辨率" />
            <nya-select v-model="cursor" fullwidth :items="cursorList" label="是否显示光标" />
            <button type="button" class="nya-btn" @click="recorde">
                {{ mediaStream ? '停 止' : '开 始' }}
            </button>
        </nya-container>
        <nya-container v-show="mediaStream" title="实时预览">
            <video ref="video" style="width:100%" autoplay></video>
        </nya-container>
        <nya-container v-show="previewUrl && !mediaStream" title="预览">
            <video ref="preview" :src="previewUrl" style="width:100%" loop controls autoplay></video>
        </nya-container>
        <nya-container title="说明">
            <ul class="nya-list">
                <li>选项设置不生效？Chrome 了解一下！</li>
                <li>
                    无法使用？
                    <a
                        href="https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getDisplayMedia"
                        target="_blank"
                        rel="noopener noreferrer"
                    >点击</a>查询兼容性
                </li>
                <li>是的，不支持录制系统/麦克风音频。</li>
                <li>使用开源版本部署时请启用 SSL</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'ScreenRecord',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            // prop
            aspectRatio: 'default',
            aspectRatioList: {
                default: '默认',
                '1.77': '16:9',
                '1.33': '4:3',
                '2.35': '21:9',
                '1.4': '14:10',
                '1.9': '19:10'
            },
            frameRate: 'default',
            frameRateList: {
                default: '默认',
                '60': '60',
                '30': '30',
                '25': '25',
                '15': '15',
                '5': '5'
            },
            resolutions: 'default',
            resolutionsList: {
                default: '默认',
                'fit-screen': '屏幕尺寸',
                '4K': '4k',
                '1080p': '1080p',
                '720p': '720p'
            },
            cursor: 'default',
            cursorList: {
                default: '默认',
                always: '是',
                never: '否'
            },
            // data
            mediaRecorder: null,
            mediaStream: null,
            recordeBlods: [],
            previewUrl: ''
        };
    },
    watch: {
        mediaStream: {
            handler() {
                const video = this.$refs.video || {};
                video.srcObject = this.mediaStream;
            },
            immediate: true
        }
    },
    methods: {
        recorde() {
            if (this.mediaStream) {
                this.stop();
            } else {
                this.start();
            }
        },
        async start() {
            this.mediaRecorder = null;
            this.mediaStream = null;
            this.recordeBlods = [];
            try {
                const displayMediaOptions = this.getDisplayMediaOptions();

                this.mediaStream = await navigator.mediaDevices.getDisplayMedia(
                    displayMediaOptions
                );
                this.mediaStream.oninactive = function() {
                    this.stop();
                }.bind(this);
                this.mediaRecorder = new MediaRecorder(this.mediaStream);
                this.mediaRecorder.ondataavailable = this.handleDataAvailable;
                this.mediaRecorder.start();
            } catch (e) {
                this.$modal.show('dialog', {
                    title: e.name,
                    text: e.message
                });
            }
        },
        stop() {
            if (this.mediaStream) {
                let tracks = this.mediaStream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
                this.mediaStream = null;
                this.mediaRecorder.stop();
            }
        },
        handleDataAvailable(event) {
            if (event.data.size > 0) {
                this.recordeBlods.push(event.data);
                this.createPreviewVideo();
            }
        },
        createPreviewVideo() {
            const blob = new Blob(this.recordeBlods, {
                type: 'video/webm'
            });
            this.recordeBlods = [];
            this.previewUrl = URL.createObjectURL(blob);
        },
        getDisplayMediaOptions() {
            let videoConstraints = {};

            if (this.aspectRatio !== 'default') {
                videoConstraints.aspectRatio = this.aspectRatio;
            }

            if (this.frameRate !== 'default') {
                videoConstraints.frameRate = this.frameRate;
            }

            if (this.cursor !== 'default') {
                videoConstraints.cursor = this.cursor;
            }

            if (this.resolutions !== 'default') {
                if (this.resolutions === 'fit-screen') {
                    videoConstraints.width = screen.width;
                    videoConstraints.height = screen.height;
                }
                if (this.resolutions === '4K') {
                    videoConstraints.width = 3840;
                    videoConstraints.height = 2160;
                }
                if (this.resolutions === '1080p') {
                    videoConstraints.width = 1920;
                    videoConstraints.height = 1080;
                }
                if (this.resolutions === '720p') {
                    videoConstraints.width = 1280;
                    videoConstraints.height = 720;
                }
            }

            return {
                video: videoConstraints,
                audio: false
            };
        }
    }
};
</script>

<style lang="scss">
.screen_record {
    .nya-select {
        margin-bottom: 15px;
    }
}
</style>
