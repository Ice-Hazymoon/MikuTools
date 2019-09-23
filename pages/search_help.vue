<template>
    <div class="search_help">
        <nya-container title="帮你百度">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="keyword"
                    label="请输入要搜索的内容"
                    placeholder="MikuTools是什么？"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="go"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="go"
                >
                    {{ loading ? '获取中' : '开始获取' }}
                </button>
            </div>
            <nya-select v-model="type" fullwidth class="mt-15" :items="typeList" label="选择搜索引擎" />
        </nya-container>

        <nya-container v-if="results" title="获取成功">
            <a :href="results" target="_blank" rel="noopener noreferrer">
                {{ results }}
            </a>
        </nya-container>
        
        <nya-container title="说明">
            <ul class="nya-list">
                <li>沙雕网友问的问题太简单，不想回答？这个时候就可以使用这个工具教他百度啦ww</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'SearchHelp',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            keyword: '',
            results: '',
            type: 'baidu',
            typeList: {
                google: '谷歌',
                baidu: '百度',
                pornhub: 'Pornhub',
                github: 'GitHub'
            },
            loading: false
        };
    },
    computed: {
        url() {
            return `${process.env.url}/o/search_help?s=${
                this.type
            }&k=${encodeURIComponent(this.keyword)}`;
        }
    },
    methods: {
        go() {
            if (this.loading) return false;
            if (this.keyword) {
                this.results = this.url;
            } else {
                this.$swal({
                    type: 'error',
                    title: '下载失败',
                    text: `ERROR: 请输入正确的链接`
                });
            }
        }
    }
};
</script>
