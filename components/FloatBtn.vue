<template>
    <div v-show="$route.path !== '/'" class="float-btn">
        <ul>
            <li title="代码" @click="$modal.show('code')">
                <i class="eva eva-code"></i>
            </li>
            <li title="打赏" @click="$modal.show('pay')">
                <i class="eva eva-gift"></i>
            </li>
            <li title="分享" @click="share">
                <i class="eva eva-share"></i>
                <span></span>
            </li>
        </ul>
        <div class="main" :title="collected ? '收藏本工具' : '取消收藏'" @click="collect">
            <i v-if="collected" class="eva eva-star"></i>
            <i v-else class="eva eva-star-outline"></i>
        </div>
        <client-only>
            <modal class="code" name="code" height="auto" width="500" reset adaptive>
                <div class="title">
                    将以下代码放到你的网页中
                </div>
                <Dynamic tag="pre" :template="iframeText" />
            </modal>
            <modal class="pay" name="pay" height="auto" width="300" reset adaptive>
                <div class="title">
                    请作者喝一杯咖啡？
                </div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPkAAAD5AQMAAADfgQHTAAAABlBMVEX///8AAABVwtN+AAABKElEQVRo3u3YQRLCIAwF0HTFMTyqHpVjuGqEz29Sd0G3P+NgCW+VYSCtOeNtZo8crvRLgGD8DOljqaf7CTXjENgBo6xjmGu9eUzhBX4EvoZD4B+AiVGZwD5AOo/PMW3wyArsAAa2ag7MCtTBV7TTnh0FjhCoAtQ2DtJYm2p4gTpgc9RtdUhQyFEJVAFOTsS9yte5KrABvGNvtug6F7g2rUARxOXuZwwzopMXKIL5H7cRiw6xLieBKsjWna/j8FjDgkAZxJWOKnOYOWPlBaog3nry+HRGNxMog4wJkJ5+ThEvgSpwBvsiqCi6QBnk5X7/RIRSs38SKIOsLTJU8dlIYBvYCIDo35ET2AbYqli77iU8CZQB0ixw9Eq5hwXKgJFnaPP7y7pAEXwAEcs7OSsUWygAAAAASUVORK5CYII=" alt="pay">
            </modal>
            <modal class="phone" name="phone" height="auto" width="300" reset adaptive>
                <div class="title">
                    在其他设备上使用
                </div>
                <img :src="qrcodeUrl" alt="pay">
            </modal>
            <modal class="share" name="share" height="auto" width="300" reset adaptive>
                <div class="title">
                    分享当前工具到
                </div>
                <div class="list">
                    <a :href="`http://connect.qq.com/widget/shareqq/index.html?url=${shareData.url}&desc=${shareData.title}&pics=${shareData.pic}`" target="_blank" rel="noopener noreferrer">QQ</a>
                    <a :href="`http://qr.liantu.com/api.php?text=${shareData.url}`" target="_blank" rel="noopener noreferrer">微信</a>
                    <a :href="`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareData.url}&title=${shareData.title}&pics${shareData.pic}=&summary=${shareData.content}`" target="_blank" rel="noopener noreferrer">QQ空间</a>
                    <a :href="`http://service.weibo.com/share/share.php?url=${shareData.url}&title=${shareData.title}&pic=${shareData.pic}&searchPic=false`" target="_blank" rel="noopener noreferrer">微博</a>
                    <a :href="`http://www.douban.com/share/service?href=${shareData.url}&name=${shareData.title}&text=${shareData.content}&image=${shareData.pic}`" target="_blank" rel="noopener noreferrer">豆瓣</a>
                    <a :href="`http://widget.renren.com/dialog/share?resourceUrl=${shareData.url}&srcUrl=${shareData.url}&title=${shareData.title}&description=${shareData.content}`" target="_blank" rel="noopener noreferrer">人人</a>
                    <a :href="`https://twitter.com/intent/tweet?text=${shareData.title}&url=${shareData.url}`" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&t=${shareData.title}&pic=${shareData.pic}`" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a :href="`https://www.linkedin.com/shareArticle?title=${shareData.title}&summary=${shareData.content}&mini=true&url=${shareData.url}&ro=true`" target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import QR from 'qr-image';
import _ from 'lodash';
import Dynamic from './Dynamic';

export default {
    name: 'FloatBtn',
    components: {
        Dynamic
    },
    data() {
        return {
            qrcodeUrl: ''
        };
    },
    computed: {
        iframeText() {
            return `<span style="color: #a1a8b5;">&lt;</span><span style="color: rgb(224, 108, 117);">iframe</span> <span style="color: rgb(209, 154, 102);">src</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"${
                this.$store.state.env.url
            }${
                this.$route.path
            }"</span> <span style="color: rgb(209, 154, 102);">width</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"100%"</span> <span style="color: rgb(209, 154, 102);">height</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"400px"</span> <span style="color: rgb(209, 154, 102);">scrolling</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"no"</span> <span style="color: rgb(209, 154, 102);">style</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"border:0px;"</span><span style="color: #a1a8b5;">&gt;</span><span style="color: #a1a8b5;">&lt;</span><span style="color: #a1a8b5;">/</span><span style="color: rgb(224, 108, 117);">iframe</span><span style="color: #a1a8b5;">&gt;</span>`;
        },
        collected() {
            const path = this.$route.path;
            let flag = this.$store.state.setting.favorites.indexOf(path);
            return flag !== -1;
        },
        shareData() {
            if (this.$route.path === '/') return {};
            if (!this.$store.state.currentTool) return {};
            let description = this.$store.state.currentTool.head.meta.filter(
                e => e.description
            );
            if (description.length) {
                description = description[0].description;
            }
            return {
                url: process.env.url + this.$route.path,
                title: this.$store.state.currentTool.name,
                content: description,
                pic: process.env.url + '/icon.png'
            };
        }
    },
    methods: {
        collect() {
            const path = this.$route.path;
            if (path === '/') {
                return false;
            }
            let favorites = _.chain(this.$store.state.setting.favorites);
            let flag = favorites.indexOf(path).value();
            if (flag === -1) {
                favorites.push(path).value();
                this.$noty.success('收藏成功');
            } else {
                favorites.pull(path).value();
                this.$noty.success('取消收藏成功');
            }
            this.$store.commit('SET_STORE', {
                key: 'setting.favorites',
                value: favorites.value()
            });
        },
        viewInPhone() {
            const QRData = QR.imageSync(process.env.url + this.$route.path, {
                type: 'jpg',
                size: 10,
                margin: 0
            });
            this.qrcodeUrl =
                `data:image/jpg;base64,` + QRData.toString('base64');
            this.$modal.show('phone');
        },
        share() {
            this.$modal.show('share');
        }
    }
};
</script>


<style lang="scss">
.float-btn {
    position: relative;
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: 30px;
    &:hover {
        ul {
            opacity: 1;
        }
    }
    .code {
        pre {
            margin-bottom: 0;
            margin-top: 0;
            border: none;
            background-color: #282c34;
        }
    }
    ul {
        margin: 0 auto;
        padding: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transition: all 0.3s ease;
        @media (max-width: 600px) {
            display: none;
        }
        li {
            cursor: pointer;
            list-style: none;
            margin-bottom: 15px;
            padding: 0;
            font-size: 25px;
            background-color: var(--theme);
            color: #ffffff;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .main {
        cursor: pointer;
        width: 55px;
        height: 55px;
        background-color: var(--theme);
        border-radius: 50%;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
            1px 3px 8px rgba(39, 44, 49, 0.03);
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 20px;
            color: #eeeeee;
        }
    }
    .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #d8d8d8;
        color: #222831;
    }
    .pay,
    .phone {
        img {
            padding: 20px;
            box-sizing: border-box;
            width: 100%;
        }
    }
    .share {
        .list {
            padding: 8px;
            a {
                display: inline-block;
                margin: 8px;
                font-size: 18px;
            }
        }
    }
}
</style>
