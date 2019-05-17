<template>
    <div class="zhihu_viewall">
        <nya-container title="知乎免登陆查看回答">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="link"
                    label="请输入问题链接"
                    placeholder="https://www.zhihu.com/question/322443498/"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="go"
                />
                <button
                    type="button"
                    class="nya-btn"
                    @click="go"
                >
                    立即跳转
                </button>
            </div>
        </nya-container>

        <nya-container v-if="results" title="获取成功">
            <a :href="results" target="_blank" rel="noopener noreferrer">
                {{ results }}
            </a>
        </nya-container>
        
        <nya-container title="Explain">
            <ul class="nya-list">
                <li>支持去除知乎限制，手机网页免登陆查看知乎所有回答，只支持移动端，PC端可以直接查看</li>
                <li>如果跳转的时候提示用其他应用打开，选择当前浏览器即可</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import isMobile from 'ismobilejs';
export default {
    name: 'ZhihuViewall',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            link: '',
            results: '',
            requestIn: false
        };
    },
    mounted() {},
    methods: {
        go() {
            if (/(https?:\/\/)?www\.zhihu\.com/.test(this.link)) {
                if (!isMobile.any) {
                    window.open(this.link);
                    this.$modal.show('dialog', {
                        title: '提示',
                        text: `只支持移动端使用，PC可直接查看知乎全部答案`
                    });
                    return false;
                }
                this.$router.push({
                    path: '/other/zhihu_go',
                    query: {
                        url: this.link,
                        m: '2683b9fd651e3b8f485a12d22c8436c0',
                        w:
                            'cache.baidu.com,cache.so.com,cache.sogou.com,cache.soso.com'
                    }
                });
            } else {
                this.$modal.show('dialog', {
                    title: '提示',
                    text: `ERROR: 这可能不是一个知乎链接`
                });
            }
        }
    }
};
</script>

<style lang="scss">
.zhihu_viewall {
}
</style>
