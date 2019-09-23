<template>
    <div class="qrcode_generation">
        <nya-container title="二维码生成/识别">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="qrcodeText"
                    label="请输入要生成的内容"
                    placeholder="https://imiku.me"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="generation"
                />
                <button type="button" class="nya-btn" :disabled="loading" @click="generation">
                    {{ loading ? '获取中' : '开始获取' }}
                </button>
            </div>
            <br>
            <nya-input
                v-model="n"
                class="upfile"
                type="file"
                name="qrcode"
                accept="image/*"
                label="请选择要识别的二维码图片"
                placeholder="点击这里上传文件"
                @change="readerQrcode"
            />
        </nya-container>

        <nya-container v-show="dataUrl || rdata" title="获取成功">
            <pre v-if="rdata">{{ rdata }}</pre>
            <img v-else :src="dataUrl" alt="QRCode" class="qrcode">
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>本站仅提供简单的二维码生成，如有其他样式需求可自行选择其他工具</li>
                <li>二维码识别若出现错误，可能由于二维码内容过于复杂或不是一个二维码</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import QR from 'qr-image';
import qrcodeReader from '~/utils/qrcode-reader.js';
export default {
    name: 'QrcodeGeneration',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            n: '', // 没什么卵用
            qrcodeText: '', // 要生成的内容
            dataUrl: '', // 生成后的图片内容
            rdata: '', // 解析后的内容
            loading: false
        };
    },
    methods: {
        readerQrcode(e) {
            this.dataUrl = '';
            this.rdata = '';
            let files = e.target.files;
            if (!files.length) return false;
            const blobUrl = URL.createObjectURL(files[0]);
            qrcodeReader(blobUrl)
                .then(e => {
                    this.rdata = e.data;
                })
                .catch(() => {
                    this.$swal({
                        type: 'error',
                        title: '识别失败',
                        text: `ERROR: 可能不是一个二维码，或由于二维码内容过于复杂`
                    });
                });
        },
        generation() {
            this.loading = true;
            this.dataUrl = '';
            this.rdata = '';
            if (this.qrcodeText) {
                try {
                    const QRData = QR.imageSync(this.qrcodeText, {
                        type: 'png',
                        size: 10
                    });
                    this.dataUrl =
                        `data:image/png;base64,` + QRData.toString('base64');
                    this.loading = false;
                } catch (error) {
                    this.loading = false;
                    this.$swal({
                        type: 'error',
                        title: '生成失败',
                        text: `ERROR: ${error}`
                    });
                }
            } else {
                this.loading = false;
                this.$swal({
                    type: 'error',
                    title: '生成失败',
                    text: `ERROR: 请输入内容`
                });
            }
        }
    }
};
</script>

<style lang="scss">
.qrcode_generation {
    .upfile {
        width: 100%;
    }
    .qrcode {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
}
</style>
