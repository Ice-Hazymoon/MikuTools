<template>
    <div class="IPSignature">
        <nya-container title="IP签名档">
            <div class="center">
                <div class="left">
                    <h4>使用方法</h4>
                    <p>1. 点击生成即可生成签名档</p>
                    <p>2. 点击下载可将签名档卡片保存到本地</p>
                    <p>状态: {{ status }} </p>
                </div>
                <div class="right">
                    <button @click="submit()">
                        生成
                    </button>
                    <img :src="imgSrc">
                    <button><a :href="imgSrc" download="ip">下载</a></button>
                </div>
            </div>
        </nya-container>
        <nya-container title="说明">
            <p>IP签名档来自：<a href="https://github.com/xhboke/IP" target="_blank" rel="noopener noreferrer">https://github.com/xhboke/IP</a></p>
        </nya-container>
    </div>
</template>

<script>
import IPSignature from '../static/img/IPSignature.jpg';
export default {
    name: 'IPSignature',
    data() {
        return {
            imgSrc: IPSignature,
            status: '未生成'
        };
    },
    methods: {
        submit() {
            this.status = '正在生成中';
            this.$axios
                .get('/IP/')
                .then(e => {
                    if (e.data != '') {
                        this.imgSrc = /IP/;
                        this.status = '生成完毕，可下载签名档到本地';
                    }
                })
                .catch(err => {
                    this.$modal.show('dialog', {
                        title: '提交失败',
                        text: `ERROR: 提交签名档失败，请刷新页面重试 ${err}`
                    });
                    this.status = '生成失败，请刷新页面重试';
                });
        }
    }
};
</script>

<style scoped lang="scss">
.IPSignature {
    .center {
        text-align: center;
        .left {
            margin-left: 3rem;
            margin-top: 2rem;
            float: left;
            p {
                text-align: left;
            }
        }
        .right {
            button {
                padding: 0.5rem 0.9375rem;
                border-radius: 0.5rem;
                background-color: var(--theme);
                border: none;
                cursor: pointer;
                font-size: 1.0625rem;
                font-weight: 600;
                color: #fff;
                a {
                    color: #fff;
                    cursor: pointer;
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
