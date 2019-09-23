<template>
    <nya-container title="背景图片" class="set-bg">
        <div class="radio-group">
            <nya-radio-group :value="$store.state.setting.bg.type" @change="handleChange('setting.bg.type', $event)">
                <nya-radio value="none" label="无" />
                <nya-radio value="anime" label="随机动漫图片" />
                <nya-radio value="bing" label="必应每日壁纸" />
                <nya-radio value="custom" label="自定义来源" />
                <nya-radio value="upload" label="上传壁纸" />
            </nya-radio-group>
        </div>

        <nya-input v-show="$store.state.setting.bg.type === 'custom'" :value="$store.state.setting.bg.customUrl" label="输入壁纸链接" :placeholder="`${$store.state.env.url}/icon.png`" autocomplete="off" fullwidth @change="handleChange('setting.bg.customUrl', $event.target.value)" @keyup.enter="handleChange('setting.bg.customUrl', $event.target.value)" />
        
        <div v-show="$store.state.setting.bg.type === 'upload'">
            <div class="inputbtn">
                <nya-input
                    v-model="upload.n"
                    class="upfile"
                    type="file"
                    accept="image/*"
                    label="请选择要设置的背景图片"
                    placeholder="点击这里上传文件"
                    @change="handleUploadChange"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="upload.requestIn"
                    @click="uploadImg"
                >
                    {{ upload.requestIn ? '设置中' : '设置' }}
                </button>
            </div>
            <div v-if="upload.smmsData && upload.smmsData.url">
                <div class="nya-subtitle">
                    预览(当前背景)
                </div>
                <img class="preview" :src="upload.smmsData.url" alt="preview">
                <div v-show="$store.state.setting.bg" class="nya-btn" @click="removeBg">
                    移除背景
                </div>
            </div>
        </div>
        <hr>

        <nya-checkbox :checked="$store.state.setting.bg.transparentEl" label="元素半透明" @change="handleChange('setting.bg.transparentEl', $event)" />
        
        <div class="nya-subtitle">
            高斯模糊
        </div>
        <client-only>
            <vue-slider :value="$store.state.setting.bg.blur" lazy :min="0" :max="100" @change="handleChange('setting.bg.blur', $event)" />
        </client-only>

        <div class="nya-subtitle">
            透明度
        </div>
        <client-only>
            <vue-slider :value="$store.state.setting.bg.opacity" lazy :min="1" :max="100" @change="handleChange('setting.bg.opacity', $event)" />
        </client-only>
    </nya-container>
</template>

<script>
import 'vue-slider-component/theme/default.css';
let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
import smms from '~/utils/smms';
export default {
    name: 'SetBackground',
    components: {
        VueSlider
    },
    data() {
        return {
            customUrl: '',
            upload: {
                n: '',
                smmsData: null,
                file: '',
                requestIn: false
            }
        };
    },
    mounted() {
        const setting = this.$store.state.setting;
        this.customUrl = setting.bg.customUrl;
        this.upload.smmsData = {
            url: setting.bg.upload.url
        };
    },
    methods: {
        handleChange(key, value) {
            this.$store.commit('SET_STORE', {
                key,
                value
            });
        },
        handleUploadChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            const size = file.size / 1024 / 1024;
            if (size > 5) {
                this.upload.n = '';
                this.$modal.show('dialog', {
                    title: '识别失败',
                    text: `ERROR: 请选择大小在5M以内的图片`
                });
            } else {
                this.upload.file = file;
            }
        },
        uploadImg() {
            if (!this.upload.file) return false;
            if (this.upload.requestIn) return false;
            this.upload.smmsData = null;
            this.upload.requestIn = true;
            smms.upload(this, this.upload.file)
                .then(e => {
                    this.upload.smmsData = e.data.data;
                    this.setUploadBg();
                })
                .catch(err => {
                    this.$modal.show('dialog', {
                        title: '上传图片失败',
                        text: `ERROR: ${err}`
                    });
                    this.upload.requestIn = false;
                });
        },
        setUploadBg() {
            this.$store.commit('SET_STORE', {
                key: 'setting.bg.upload',
                value: {
                    url: this.upload.smmsData.url,
                    deleteUrl: this.upload.smmsData.delete
                }
            });
            this.upload.requestIn = false;
        },
        removeBg() {
            let bg = this.$store.state.setting.bg.upload;
            smms.del(this, bg.deleteUrl);
            this.$store.commit('SET_STORE', {
                key: 'setting.bg.upload',
                value: {
                    url: '',
                    deleteUrl: ''
                }
            });
            this.upload.smmsData = null;
        },
        setCustomUrl() {
            this.$store.commit('SET_STORE', {
                key: 'setting.bg.customUrl',
                value: this.customUrl
            });
        }
    }
};
</script>

<style lang="scss">
.set-bg {
    .nya-radio {
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .nya-subtitle,
    .inputbtn {
        margin-top: 15px;
    }
    .preview {
        display: block;
        max-height: 200px;
        border: 1px solid var(--t1);
    }
}
</style>
