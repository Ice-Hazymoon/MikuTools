<template>
    <div class="what_anime_is_this">
        <nya-container title="这是什么动漫">
            <div class="inputbtn">
                <nya-input
                    v-model="n"
                    class="upfile"
                    type="file"
                    accept="image/*"
                    label="请选择要识别动漫截图"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <button type="button" class="nya-btn" :disabled="loading" @click="getAnime">
                    {{ loading ? '获取中' : '开始获取' }}
                </button>
            </div>
            <div v-if="preview" class="nya-subtitle">
                预览
            </div>
            <img v-if="preview" class="preview" :src="preview" alt="preview">
        </nya-container>

        <nya-container
            v-for="doc in docs"
            :key="doc.index"
            :title="doc.title_chinese+' EP#'+doc.episode"
        >
            <table>
                <tbody>
                    <tr>
                        <td>匹配位置：</td>
                        <td>{{ secToTime(doc.at) }}</td>
                    </tr>
                    <tr>
                        <td>中文名称</td>
                        <td>{{ doc.title_chinese }}</td>
                    </tr>
                    <tr>
                        <td>日文名称</td>
                        <td>{{ doc.title_native }}</td>
                    </tr>
                    <tr>
                        <td>英文名称</td>
                        <td>{{ doc.title_english }}</td>
                    </tr>
                    <tr>
                        <td>相似度</td>
                        <td>{{ toPercent(doc.similarity) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align:center">
                            <video
                                controls
                                loop
                                :src="'https://trace.moe/preview.php?anilist_id='+doc.anilist_id+'&file='+encodeURIComponent(doc.filename)+'&t='+doc.at+'&token='+doc.tokenthumb"
                            ></video>
                        </td>
                    </tr>
                </tbody>
            </table>
        </nya-container>
        <nya-container title="说明">
            <ul class="nya-list">
                <li>
                    使用 trace.moe API，有使用次数限制。(
                    <a @click="myCount">
                        查看我的次数
                    </a>)
                </li>
                <li>识别成功率取决于上传的截图</li>
                <li>多个相同/类似结果是因为返回的数据包含多个相同/类似结果</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'WhatAnimeIsThis',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            n: '',
            preview: '',
            docs: [],
            loading: false
        };
    },
    methods: {
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            const file = files[0];
            const size = (file.size * 1.34) / 1024 / 1024;
            if (size > 1) {
                this.n = '';
                this.$swal({
                    type: 'error',
                    title: '识别失败',
                    text: `ERROR: 请选择大小在 750KB 以内的图片，可尝试裁剪图片或更换图片查询`
                });
            } else {
                this.docs = [];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener(
                    'load',
                    () => {
                        this.preview = reader.result;
                    },
                    false
                );
            }
        },
        getAnime() {
            if (!this.preview) return false;
            this.loading = true;
            this.$axios
                .post(
                    'https://trace.moe/api/search',
                    {
                        image: this.preview
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        auth: false
                    }
                )
                .then(e => {
                    this.loading = false;
                    this.docs = e.data.docs;
                })
                .catch(err => {
                    this.$swal({
                        type: 'error',
                        title: '识别失败',
                        text: `ERROR: ${err}`
                    });
                    this.loading = false;
                });
        },
        secToTime(s) {
            var t;
            if (s > -1) {
                let hour = Math.floor(s / 3600);
                let min = Math.floor(s / 60) % 60;
                let sec = s % 60;
                if (hour < 10) {
                    t = '0' + hour + ':';
                } else {
                    t = hour + ':';
                }
                if (min < 10) {
                    t += '0';
                }
                t += min + ':';
                if (sec < 10) {
                    t += '0';
                }
                t += sec.toFixed(2);
            }
            return t;
        },
        toPercent(point) {
            let str = Number(point * 100).toFixed(2);
            str += '%';
            return str;
        },
        myCount() {
            if (this.loading) return false;
            this.loading = true;
            this.$axios
                .post(
                    'https://trace.moe/api/me',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        auth: false
                    }
                )
                .then(e => {
                    this.loading = false;
                    let result = e.data;
                    this.$swal({
                        type: 'error',
                        title: '我的次数',
                        text: `总次数剩余：${result.quota} 每分钟剩余：${
                            result.limit
                        }`
                    });
                })
                .catch(err => {
                    this.loading = false;
                    this.$swal({
                        type: 'error',
                        title: '获取失败',
                        text: `ERROR: ${err}`
                    });
                });
        }
    }
};
</script>

<style lang='scss'>
.what_anime_is_this {
    .nya-subtitle {
        margin-top: 15px;
    }
    .preview {
        max-height: 200px;
    }
    table {
        color: #363636;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        td {
            border: 0.0625rem solid #dbdbdb;
            padding: 0.5em 0.75em;
            vertical-align: top;
            video {
                max-width: 100%;
            }
        }
    }
}
</style>
