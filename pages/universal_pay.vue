<template>
    <div class="universal_pay">
        <nya-container title="收款码合并">
            <nya-input
                v-model="qqFile"
                class="upfile mb-15"
                type="file"
                name="qrcode"
                accept="image/*"
                label="请上传QQ收款码"
                placeholder="点击这里上传文件"
                fullwidth
                @change="readerQrcode('qq', $event)"
            />
            <nya-input
                v-model="weixinFile"
                class="upfile mb-15"
                type="file"
                name="qrcode"
                accept="image/*"
                label="请上传微信收款码"
                placeholder="点击这里上传文件"
                fullwidth
                @change="readerQrcode('weixin', $event)"
            />
            <nya-input
                v-model="alipayFile"
                class="upfile mb-15"
                type="file"
                name="qrcode"
                accept="image/*"
                label="请上传支付宝收款码"
                placeholder="点击这里上传文件"
                fullwidth
                @change="readerQrcode('alipay', $event)"
            />
            <button
                type="button"
                class="nya-btn"
                :disabled="loading"
                @click="synthetic"
            >
                {{ loading ? '合成中' : '开始合成' }}
            </button>
        </nya-container>

        <nya-container v-show="short_url" title="合并成功">
            <img :src="qrcodeUrl" alt="QRCode" class="qrcode">
            收款地址：<a :href="short_url" target="_blank" rel="noopener noreferrer">
                {{ short_url }}
            </a>
        </nya-container>
        
        <nya-container title="说明">
            <ul class="nya-list">
                <li><b>全部过程均在本地进行，不会在云端存储您的任何信息</b></li>
                <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 Chrome</li>
                <li>请保存您的收款地址，可自行去转换为短链接</li>
                <li>请使用新版 QQ/微信/支付宝 生成的收款码</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import qrcodeReader from '~/utils/qrcode-reader.js';
import QR from 'qr-image';
export default {
    name: 'UniversalPay',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            loading: false,
            qqFile: '',
            weixinFile: '',
            alipayFile: '',
            data: {
                qq: {},
                weixin: '',
                alipay: ''
            },
            url: '',
            short_url: '',
            qrcodeUrl: ''
        };
    },
    methods: {
        synthetic() {
            if (this.data.qq && this.data.weixin && this.data.alipay) {
                this.loading = true;
                this.short_url = '';
                this.qrcodeUrl = '';

                this.url = `${
                    process.env.url
                }/o/universal_pay_view?data=${Buffer.from(
                    JSON.stringify(this.data)
                ).toString('base64')}`;

                this.$axios
                    .post('/short_link', {
                        url: this.url,
                        api: 'dwz_cn'
                    })
                    .then(e => {
                        this.loading = false;
                        const short_url = e.data.data;
                        const QRData = QR.imageSync(short_url, {
                            type: 'png',
                            size: 10
                        });
                        this.short_url = short_url;
                        this.qrcodeUrl =
                            `data:image/png;base64,` +
                            QRData.toString('base64');
                    })
                    .catch(err => {
                        this.loading = false;
                        this.$swal({
                            type: 'error',
                            title: '获取失败',
                            text: err
                        });
                        const short_url = this.url;
                        const QRData = QR.imageSync(short_url, {
                            type: 'png',
                            size: 5
                        });
                        this.short_url = short_url;
                        this.qrcodeUrl =
                            `data:image/png;base64,` +
                            QRData.toString('base64');
                    });
            } else {
                this.$swal({
                    type: 'error',
                    title: '合成失败',
                    text: `ERROR: 请选择收款码`
                });
            }
        },
        readerQrcode(type, event) {
            let files = event.target.files;
            if (!files.length) return false;
            const blobUrl = URL.createObjectURL(files[0]);
            qrcodeReader(blobUrl)
                .then(e => {
                    const qqRegex = /qianbao/;
                    const weixinRegex = /wxp|tenpay/;
                    const alipayRegex = /alipay|ALIPAY/;
                    const url = e.data;
                    if (type === 'qq') {
                        this.data.qq = {};
                        if (qqRegex.test(url)) {
                            this.data.qq = url;
                        } else {
                            this.$swal({
                                type: 'error',
                                title: '识别失败',
                                text: `ERROR: 可能不是一个QQ收款码`
                            });
                            this.qqFile = '';
                        }
                    } else if (type === 'weixin') {
                        this.data.weixin = '';
                        if (weixinRegex.test(url)) {
                            this.data.weixin = url;
                        } else {
                            this.$swal({
                                type: 'error',
                                title: '识别失败',
                                text: `ERROR: 可能不是一个微信收款码`
                            });
                            this.weixinFile = '';
                        }
                    } else if (type === 'alipay') {
                        this.data.alipay = '';
                        if (alipayRegex.test(url)) {
                            this.data.alipay = url;
                        } else {
                            this.$swal({
                                type: 'error',
                                title: '识别失败',
                                text: `ERROR: 可能不是一个支付宝收款码`
                            });
                            this.alipayFile = '';
                        }
                    }
                })
                .catch(() => {
                    this.$swal({
                        type: 'error',
                        title: '识别失败',
                        text: `ERROR: 可能不是一个二维码，或由于二维码内容过于复杂`
                    });
                });
        }
    }
};
</script>

<style lang="scss">
.universal_pay {
    img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
}
</style>
