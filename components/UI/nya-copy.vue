<template>
    <div class="nya-copy">
        <div class="nya-copy-header" @click="doCopy">
            <span>点击复制</span>
            <i class="eva eva-clipboard-outline"></i>
        </div>
        <pre v-bind="$attrs"><slot></slot></pre>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        copy: {
            type: String,
            default: ''
        }
    },
    methods: {
        doCopy() {
            this.$copyText(this.copy).then(
                () => {
                    this.$noty.success('复制成功');
                },
                () => {
                    this.$noty.error('复制失败，请手动选择复制');
                }
            );
        }
    }
};
</script>

<style lang="scss">
.nya-copy {
    position: relative;
    margin-bottom: 15px;
    .nya-copy-header {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
    }
    i {
        color: var(--t1);
        font-size: 20px;
        margin-left: 5px;
    }
    pre {
        margin-top: 5px;
        margin-bottom: 0;
    }
}
</style>
