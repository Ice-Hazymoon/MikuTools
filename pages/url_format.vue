<template>
    <div class="url_format">
        <nya-container title="URL 格式化">
            <nya-input
                v-model.trim="url"
                label="请输入URL"
                :placeholder="`https://${$store.state.env.url}?a=b&b=c`"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="results" title="获取成功">
            <pre>{{ results }}</pre>
        </nya-container>
    </div>
</template>

<script>
import formatUrl from '~/utils/formatUrl.js';
export default {
    name: 'UrlFormat',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            url: ''
        };
    },
    computed: {
        results() {
            const regex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
            return regex.test(this.url) ? formatUrl(this.url) : false;
        }
    }
};
</script>
