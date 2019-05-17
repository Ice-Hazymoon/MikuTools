<template>
    <div class="template">
        <!-- 根class名称应该和文件名一致，由下划线和小写字母组成 -->
        <nya-container title="页面标题">
            <div class="inputbtn">
                <!-- 所有输入框都应该又一个placeholder，内容为一个真实实例 -->
                <nya-input
                    v-model.trim="videoLink"
                    label="请输入视频链接"
                    placeholder="placeholder"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="getVideo"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="requestIn"
                    @click="getVideo"
                >
                    <!-- 如果有需要长时间处理的任务，应该将相关按钮禁用，并给出提示，防止重复提交 -->
                    {{ requestIn ? '获取中' : '开始获取' }}
                </button>
            </div>
        </nya-container>

        <nya-container v-if="results" title="获取成功">
            <!-- 如果默认没有内容显示的container，应该默认隐藏 -->
            <a :href="results" target="_blank" rel="noopener noreferrer">
                {{ results }}
            </a>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'Template', // 应该和文件名一致，由下划线和小写字母组成
    head() {
        return this.$store.state.currentTool.head; // 页面的头部内容在 /store/tools.js里添加
    },
    data() {
        return {
            videoLink: '',
            results: '',
            requestIn: false // 如果有需要长时间处理的任务，应该将其设置为true，并禁用相关的按钮，防止重复提交
        };
    },
    methods: {
        getVideo() {
            if (this.requestIn) return false;
            const regex = /(view_video\.php)\?(viewkey=\w+)/;
            if (regex.test(this.videoLink)) {
                this.requestIn = true;
                this.results = '';
                this.$axios
                    .post('/91porn_video_downloader', {
                        url: `http://91porn.com/${
                            this.videoLink.match(regex)[0]
                        }`
                    })
                    .then(e => {
                        this.requestIn = false;
                        this.results = e.data.data;
                    })
                    .catch(err => {
                        this.requestIn = false;
                        this.$modal.show('dialog', {
                            title: '下载失败',
                            text: `ERROR: ${err}`
                        });
                    });
            } else {
                // 所有失败的错误都应该有弹窗提示
                this.$modal.show('dialog', {
                    title: '下载失败',
                    text: `ERROR: 请输入正确的链接`
                });
            }
        }
    }
};
</script>

<style lang="scss">
.template {
    // 如果页面有需要自定义的样式，需要又一个根class，名称应该和文件名一致，由下划线和小写字母组成
}
</style>
