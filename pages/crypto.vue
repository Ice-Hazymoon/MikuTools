<template>
    <div class="crypto">
        <nya-container title="在线加密解密">
            <nya-input v-model="content" fullwidth rows="5" type="textarea" autofocus autocomplete="off" label="待处理的内容" placeholder="请输入要处理的内容" />
            <nya-input v-if="ciphersList[encryption] || HMACList.includes(encryption)" v-model="key" fullwidth autocomplete="off" :label="HMACList.includes(encryption) ? 'salt' : '密钥'" :placeholder="`请输入${HMACList.includes(encryption) ? 'salt' : '密钥'}`" />
            <nya-input v-if="encryption === 'RC4Drop'" v-model="drop" fullwidth type="number" autocomplete="off" label="drop" placeholder="RC4Drop特有参数，请输入要丢弃的密匙初始数量" />
            <br>
            <nya-select v-if="!type" v-model="encryption" fullwidth :items="encryptionList" label="选择加密方式" />
            <nya-select v-else v-model="encryption" fullwidth :items="ciphersList" label="选择解密方式" />
            <br>
            <nya-checkbox v-model="type" label="解密" />
            <br>
            <button
                type="button"
                class="nya-btn"
                @click="conversion"
            >
                开始转换
            </button>
        </nya-container>

        <nya-container v-show="result" :title="`${type ? '解密' : '加密'}成功`">
            <pre>{{ result }}</pre>
        </nya-container>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
export default {
    name: 'Crypto',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            encryptionList: {
                MD5: 'MD5',
                HmacMD5: 'HmacMD5',
                SHA1: 'SHA-1',
                HmacSHA1: 'HmacSHA-1',
                SHA256: 'SHA-2',
                HmacSHA256: 'HmacSHA-2',
                SHA3: 'SHA-3',
                HmacSHA512: 'HmacSHA-3',
                RIPEMD160: 'RIPEMD-160',
                AES: 'AES',
                DES: 'DES',
                TripleDES: 'TripleDES',
                Rabbit: 'Rabbit',
                RC4: 'RC4',
                RC4Drop: 'RC4Drop'
            },
            ciphersList: {
                AES: 'AES',
                DES: 'DES',
                TripleDES: 'TripleDES',
                Rabbit: 'Rabbit',
                RC4: 'RC4',
                RC4Drop: 'RC4Drop'
            },
            HMACList: ['HmacMD5', 'HmacSHA1', 'HmacSHA256', 'HmacSHA512'],
            encryption: 'MD5', //加密方式
            type: false, //true 为解密 false 为加密
            content: '', //要处理的内容
            key: '', //密钥
            result: '', //输出的结果
            drop: 192 //RC4Drop特有参数
        };
    },
    watch: {
        type(val) {
            this.result = '';
            if (val) {
                if (!this.ciphersList[this.encryption]) {
                    this.encryption = 'AES';
                }
            }
        }
    },
    methods: {
        conversion() {
            this.result = '';
            let type = this.type ? 'decrypt' : 'encrypt';
            let result = this[this.encryption](type);
            if (result) {
                this.result = result;
            } else {
                this.$modal.show('dialog', {
                    title: '转换失败',
                    text: `ERROR: 可能是密钥不正确`
                });
            }
        },
        MD5() {
            return CryptoJS.MD5(this.content).toString();
        },
        HmacMD5() {
            return CryptoJS.HmacMD5(this.content, this.key).toString();
        },
        SHA1() {
            return CryptoJS.SHA1(this.content).toString();
        },
        HmacSHA1() {
            return CryptoJS.HmacSHA1(this.content, this.key).toString();
        },
        SHA256() {
            return CryptoJS.SHA256(this.content).toString();
        },
        HmacSHA256() {
            return CryptoJS.HmacSHA256(this.content, this.key).toString();
        },
        SHA3() {
            return CryptoJS.SHA3(this.content).toString();
        },
        HmacSHA512() {
            return CryptoJS.HmacSHA512(this.content, this.key).toString();
        },
        RIPEMD160() {
            return CryptoJS.RIPEMD160(this.content).toString();
        },
        AES(type) {
            try {
                return CryptoJS.AES[type](this.content, this.key).toString(
                    type === 'encrypt' ? undefined : CryptoJS.enc.Utf8
                );
            } catch (error) {
                return false;
            }
        },
        DES(type) {
            try {
                return CryptoJS.DES[type](this.content, this.key).toString(
                    type === 'encrypt' ? undefined : CryptoJS.enc.Utf8
                );
            } catch (error) {
                return false;
            }
        },
        TripleDES(type) {
            try {
                return CryptoJS.TripleDES[type](
                    this.content,
                    this.key
                ).toString(type === 'encrypt' ? undefined : CryptoJS.enc.Utf8);
            } catch (error) {
                return false;
            }
        },
        Rabbit(type) {
            try {
                return CryptoJS.Rabbit[type](this.content, this.key).toString(
                    type === 'encrypt' ? undefined : CryptoJS.enc.Utf8
                );
            } catch (error) {
                return false;
            }
        },
        RC4(type) {
            try {
                return CryptoJS.RC4[type](this.content, this.key).toString(
                    type === 'encrypt' ? undefined : CryptoJS.enc.Utf8
                );
            } catch (error) {
                return false;
            }
        },
        RC4Drop(type) {
            try {
                return CryptoJS.RC4Drop[type](this.content, this.key, {
                    drop: this.drop
                }).toString(type === 'encrypt' ? undefined : CryptoJS.enc.Utf8);
            } catch (error) {
                return false;
            }
        }
    }
};
</script>

<style lang="scss">
.crypto {
    .nya-input,
    .nya-select,
    .nya-checkbox {
        margin-bottom: 15px;
    }
}
</style>
