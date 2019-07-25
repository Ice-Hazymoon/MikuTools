<template>
    <div class="universal_pay_view">
        <div v-if="qrcode.qq" class="box">
            <div class="title">
                扫码向我付款
            </div>
            <a class="paylink" :href="urls[show]" target="_blank" rel="noopener noreferrer">
                或者点击这里
            </a>
            <div class="qrcode">
                <img v-if="show === 'qq'" :src="qrcode.qq" alt="qrcode">
                <img v-if="show === 'weixin'" :src="qrcode.weixin" alt="qrcode">
                <img v-if="show === 'alipay'" :src="qrcode.alipay" alt="qrcode">
            </div>
            <div class="btn">
                <div :class="{'activa': show === 'qq'}" class="qq" @click="show = 'qq'">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60">
                        <defs><style type="text/css" /></defs><path d="M0 511.964575A511.992524 511.992524 0 1 0 511.964575 0 511.964575 511.964575 0 0 0 0 511.964575z m0 0" fill="#3392D1" p-id="19575" /><path d="M300.53254 449.694836c-3.04641 8.077179 1.425385 13.191794 0 43.935381-0.391282 8.384615-36.053843 45.69615-50.307688 84.572814s-15.958717 78.843327 5.589743 94.690249 41.923074-52.711278 44.494356-42.733586q1.816667 6.875384 4.304102 13.527178a192.622549 192.622549 0 0 0 35.46692 58.692303c3.437692 3.91282-20.877691 11.179486-35.46692 35.942049s4.192307 69.871789 76.663327 69.871789c93.544352 0 114.449991-32.895638 116.350504-32.727946a139.743579 139.743579 0 0 0 14.812819 0c9.027435 0 5.282307 0.726667 13.694871 0 4.527692-0.391282 50.000252 39.351792 112.94076 32.727946 107.211274-11.179486 90.833326-47.205381 82.392814-69.871789-8.775897-23.672562-39.854869-34.768202-38.457433-36.333331 25.68487-28.395895 29.765382-45.807945 38.457433-71.884097 3.577436-10.732307 28.479741 58.97179 47.512817 42.733587 7.993333-6.763589 23.952049-34.935895 7.993333-94.690249s-46.842048-73.365379-46.171279-84.572814c1.397436-23.309229 0.586923-39.687176-0.586923-43.935381-5.589743-20.542306-17.63564-16.014614-17.635639-20.542306 0-118.251016-88.932813-214.115111-198.631523-214.115111S315.820488 310.901514 315.820488 429.15253c0 9.390768-8.384615 2.459487-15.176153 20.542306z m0 0" fill="#FFFFFF" p-id="19576" />
                    </svg>
                </div>
                <div :class="{'activa': show === 'weixin'}" class="weixin" @click="show = 'weixin'">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16387" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60">
                        <defs><style type="text/css" /></defs><path d="M417.485 663.603c-57.344 34.56-65.792-19.456-65.792-19.456l-71.834-181.504c-27.597-86.272 23.962-38.963 23.962-38.963s44.237 36.25 77.773 58.368c33.536 22.118 71.833 6.502 71.833 6.502L922.88 253.798C836.3 137.062 693.197 60.723 531.2 60.723c-264.397 0-478.669 203.162-478.669 453.786 0 144.128 70.963 272.435 181.504 355.635l-19.968 124.109s-9.728 36.147 23.962 19.405c22.937-11.52 81.408-52.532 116.275-77.517 54.733 20.582 114.38 32.102 176.947 32.102 264.295 0 478.72-203.161 478.72-453.734 0-72.602-18.125-141.21-50.125-201.984-149.606 97.433-497.51 323.993-542.361 351.078" fill="#25A838" p-id="16388" />
                    </svg>
                </div>
                <div :class="{'activa': show === 'alipay'}" class="alipay" @click="show = 'alipay'">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17095" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60">
                        <defs><style type="text/css" /></defs><path d="M191.933 692.705c0-69.499 50.97-106.567 88.034-111.206 111.201-18.535 264.11 74.132 264.11 74.132-69.504 88.039-166.81 134.37-240.942 134.37-64.866-4.624-111.202-41.698-111.202-97.296z m787.697 37.07c-13.906-4.64-328.98-101.94-319.713-111.212 46.336-55.599 78.771-185.34 78.771-185.34v-27.8H553.349v-69.495h227.047v-41.702H553.349v-101.94h-92.672v97.306H256.804v41.703h203.873v69.499h-162.17v27.801h333.608c0 13.901-23.163 106.568-46.336 148.27-4.628-9.267-152.903-60.237-236.308-64.865-88.034 4.634-157.538 32.435-189.973 97.306-46.336 120.468 27.802 240.942 194.606 240.942 27.802 0 162.171-13.901 264.11-152.91 27.802 13.902 185.334 92.673 282.645 143.642-92.672 111.202-231.68 180.71-389.217 180.71A508.211 508.211 0 0 1 1.96 512.006a508.211 508.211 0 0 1 509.68-509.68 508.211 508.211 0 0 1 509.686 509.68c4.634 83.4-13.895 152.899-41.697 217.77z" fill="#1296db" p-id="17096" />
                    </svg>
                </div>
            </div>
            <div class="subtitle">
                点击按钮切换二维码
            </div>
        </div>
    </div>
</template>

<script>
import QR from 'qr-image';
const QROptions = {
    type: 'png',
    parse_url: true,
    size: 10,
    margin: 2
};
export default {
    name: 'WsingDownloader',
    layout: 'blank',
    head() {
        return {
            title: this.title
        };
    },
    data() {
        return {
            title: `收款 - ${process.env.title}`,
            urls: {},
            qrcode: {},
            show: 'weixin'
        };
    },
    async mounted() {
        if (!this.$route.query.data) return false;
        const UA = navigator.userAgent;
        const data = this.$route.query.data;

        let json = Buffer.from(data, 'base64').toString();
        json = JSON.parse(json);

        this.urls = json;

        this.qrcode = {
            alipay:
                `data:image/png;base64,` +
                QR.imageSync(this.urls.alipay, QROptions).toString('base64'),
            qq:
                `data:image/png;base64,` +
                QR.imageSync(this.urls.qq, QROptions).toString('base64'),
            weixin:
                `data:image/png;base64,` +
                QR.imageSync(this.urls.weixin, QROptions).toString('base64')
        };

        if (UA.match(/MicroMessenger\//i)) {
            this.show = 'weixin';
        } else if (UA.match(/QQ\//i)) {
            this.show = 'qq';
        } else if (UA.match(/Alipay/i)) {
            this.show = 'alipay';
            window.location.href = this.urls['alipay'];
        } else {
            this.show = 'weixin';
        }
    }
};
</script>

<style lang="scss">
.universal_pay_view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
        width: 300px;
        max-width: 100%;
        padding: 10px;
        .title {
            font-size: 30px;
            text-align: center;
            margin-bottom: 5px;
        }
        .paylink {
            text-align: center;
            display: block;
            font-size: 14px;
        }
        .qrcode {
            width: 100%;
            margin-bottom: 10px;
            img {
                width: 100%;
                display: block;
            }
        }
        .btn {
            display: flex;
            justify-content: space-around;
            div {
                cursor: pointer;
                width: 60px;
                height: 60px;
                svg {
                    width: 100%;
                    height: 100%;
                }
                opacity: 0.4;
                &.activa {
                    opacity: 1;
                }
            }
        }
        .subtitle {
            opacity: 0.4;
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
        }
    }
}
</style>
