<template>
    <div class="text_diff">
        <nya-container title="在线文本对比" />
    </div>
</template>

<script>
export default {
    name: 'TextDiff',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            videoLink: '',
            results: '',
            requestIn: false // 如果有需要长时间处理的任务，应该将其设置为true，并禁用相关的按钮，防止重复提交
        };
    },
    methods: {}
};
</script>

<style lang="scss">
.text_diff {
}
</style>
