<template>
    <div class="urlconvert">
        <nya-container title="磁力转换">
            <div class="content">
                <h4> 提示: 原始地址支持迅雷,快车,旋风的下载地址互转</h4>
                <p>
                    <i>原始地址: </i><input v-model="sourcelink" type="text" class="firstIpt" placeholder="请输入原始地址" @input="inputFun"><button @click="submit">
                        转换
                    </button>
                </p>
                <p><i>真实地址: </i><input v-model="http" type="text" :placeholder="placeholder"></p>
                <p><i>迅雷地址: </i><input v-model="thunder" type="text" :placeholder="placeholder"></p>
                <p><i>快车地址: </i><input v-model="qqdl" type="text" :placeholder="placeholder"></p>
                <p><i>旋风地址: </i><input v-model="flashget" type="text" :placeholder="placeholder"></p>
            </div>
        </nya-container>
        <nya-container title="说明">
            <p>磁力转换来自：<a href="https://tool.lu" target="_blank" rel="noopener noreferrer">https://tool.lu</a></p>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'UrlConvert',
    data() {
        return {
            sourcelink:
                'thunder://QUFodHRwczovL2RsLjM2MHNhZmUuY29tLzM2MHppcF9zZXR1cF80LjAuMC4xMjAwLmV4ZVpa',
            http: '',
            thunder: '',
            qqdl: '',
            flashget: '',
            placeholder: ' 请点击转换按钮,获取转换后的链接'
        };
    },
    methods: {
        inputFun() {
            if (this.sourcelink == '') {
                (this.http = ''),
                    (this.thunder = ''),
                    (this.qqdl = ''),
                    (this.flashget = '');
            } else {
                this.submit();
            }
        },
        submit() {
            if (this.sourcelink != '') {
                this.change();
                this.placeholder = ' 正在转换中...';
            } else {
                this.$modal.show('dialog', {
                    title: '原始地址不能为空',
                    text: `Warning: 原始地址不能为空，请输入原始地址`
                });
            }
        },
        change() {
            let data = new FormData();
            data.append('link', this.sourcelink);
            this.$axios
                .post('/url_convert/', data)
                .then(e => {
                    if (e.data.status == true) {
                        this.http = e.data.text.http;
                        this.thunder = e.data.text.thunder;
                        this.qqdl = e.data.text.qqdl;
                        this.flashget = e.data.text.flashget;
                    }
                })
                .catch(err => {
                    this.$modal.show('dialog', {
                        title: '转换失败',
                        text: `ERROR: 磁力转换失败，请刷新页面重试 ${err}`
                    });
                });
        }
    }
};
</script>

<style scoped lang="scss">
.urlconvert {
    .content {
        h4 {
            text-align: center;
            margin: 3rem;
        }
        p {
            i {
                font-style: normal;
                margin: 0 1.8rem;
                left: 1rem;
                top: 0;
            }
            .firstIpt {
                width: 50rem;
            }
            button {
                background-color: var(--theme);
                color: #fff;
                font-size: 1.0625rem;
                font-weight: 600;
                line-height: 1.25rem;
                vertical-align: middle;
                box-shadow: 0 0.5rem 0.625rem rgba(36, 159, 253, 0.30196);
                border-radius: 0.5rem;
                border: none;
                cursor: pointer;
                margin-left: 2rem;
                width: 4rem;
                height: 2.5rem;
            }
            input {
                outline-style: none;
                border: 0.1rem solid var(--theme);
                border-radius: 0.1rem;
                width: 56rem;
                height: 2rem;
                text-indent: 1rem;
            }
        }
    }
}
</style>
