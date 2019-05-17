<template>
    <div></div>
</template>

<script>
export default {
    name: 'ZhihuGo',
    layout: 'blank',
    head() {
        return {
            title: this.title
        };
    },
    data() {
        return {
            title: `知乎跳转 - ${process.env.title}`
        };
    },
    mounted() {
        if (this.$route.query.url) {
            if (process.browser) {
                window.location.href = this.$route.query.url;
            }
        } else {
            this.$router.replace('/tools/zhihu_viewall');
        }
    }
};
</script>
