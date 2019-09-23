<template>
    <div class="line_sticker_download">
        <nya-container title="LINE 贴纸下载">
            <nya-input
                v-model.trim="link"
                label="请输入贴纸链接"
                placeholder="https://store.line.me/stickershop/product/12954/zh-Hans"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="results.length" title="获取成功">
            <div class="x">
                <div class="nya-subtitle">
                    静态贴纸打包
                </div>
                <a :href="results[0][0]" target="_blank" rel="noopener noreferrer">Android</a>
                <a :href="results[0][1]" target="_blank" rel="noopener noreferrer">iPhone2x</a>
                <a :href="results[0][2]" target="_blank" rel="noopener noreferrer">PC</a>
            </div>
            <div class="x">
                <div class="nya-subtitle">
                    动态/音效/魔法贴纸打包
                </div>
                <a :href="results[1][0]" target="_blank" rel="noopener noreferrer">Android</a>
                <a :href="results[1][1]" target="_blank" rel="noopener noreferrer">iPhone2x</a>
                <a :href="results[1][2]" target="_blank" rel="noopener noreferrer">PC</a>
            </div>
        </nya-container>
    </div>
</template>

<script>
import validator from 'validator';
export default {
    name: 'LineStickerDownload',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            link: '',
            loading: false
        };
    },
    computed: {
        results() {
            let id = this.link.match(/(product|sticker)\/[0-9]+/);
            if (validator.isURL(this.link) && id) {
                id = id[0].replace(/(product|sticker)\//, '');
                return [
                    [
                        `https://stickershop.line-scdn.net/stickershop/v1/product/${id}/android/stickers.zip`,
                        `https://stickershop.line-scdn.net/stickershop/v1/product/${id}/iphone/stickers@2x.zip`,
                        `https://stickershop.line-scdn.net/stickershop/v1/product/${id}/PC/stickers.zip`
                    ],
                    [
                        `https://stickershop.line-scdn.net/stickershop/v1/product/${id}/android/stickerpack.zip`,
                        `https://stickershop.line-scdn.net/stickershop/v1/product/${id}/iphone/stickerpack@2x.zip`,
                        `https://stickershop.line-scdn.net/stickershop/v1/product/${id}/PC/stickerpack.zip`
                    ]
                ];
            } else {
                return [];
            }
        }
    }
};
</script>

<style lang="scss">
.line_sticker_download {
    a {
        margin-right: 5px;
    }
    .x:not(:last-child) {
        margin-bottom: 20px;
    }
}
</style>
