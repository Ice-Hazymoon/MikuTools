<template>
    <div class="meme-weibo">
        <nya-container title="微博生成器">
            <nya-select v-model="vip" :items="vipList" label="选择VIP等级" />
            <nya-input
                v-model="n"
                class="upfile"
                type="file"
                name="qrcode"
                accept="image/*"
                label="请选择头像"
                placeholder="点击这里上传文件"
                fullwidth
                @change="getAvatar"
            />
            <nya-checkbox v-model="renzheng" label="个人认证" />
            <nya-checkbox v-model="daren" label="微博达人" />
            <div class="weibo-box">
                <div ref="weibo" class="c">
                    <div contenteditable="true" class="user-box">
                        <div class="header">
                            <img :src="avatar" class="avatar">
                            <div class="info">
                                <div class="info-header">
                                    <span class="name">
                                        李思聪
                                    </span>
                                    <i v-show="renzheng" class="icon_approve_gold"></i>
                                    <i v-show="daren" class="daren"></i>
                                    <i class="icon_member" :class="vip"></i>
                                </div>
                                <div class="line2">
                                    3月3日 12:00 来自 iPhone X
                                </div>
                                <div class="content">
                                    为庆祝粉丝突破3000万，发个小福利，打开支付宝搜索xxxxxx即可领取随机大红包。
                                </div>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="btn">
                                <em class="W_ficon ficon_favorite S_ficon">
                                    û
                                </em>
                                <span class="text">
                                    收藏
                                </span>
                            </div>
                            <div class="btn">
                                <em class="W_ficon ficon_forward S_ficon">
                                    
                                </em>
                                <span class="text">
                                    45682
                                </span>
                            </div>
                            <div class="btn">
                                <em class="W_ficon ficon_repeat S_ficon">
                                    
                                </em>
                                <span class="text">
                                    65456
                                </span>
                            </div>
                            <div class="btn">
                                <em class="W_ficon ficon_praised S_txt2">
                                    ñ
                                </em>
                                <span class="text">
                                    22323
                                </span>
                            </div>
                        </div>
                        <i class="W_ficon ficon_arrow_down S_ficon">
                            c
                        </i>
                    </div>
                </div>
            </div>
            <button
                type="button"
                class="nya-btn"
                :disabled="loading"
                @click="conversion"
            >
                {{ loading ? '生成中' : '开始生成' }}
            </button>
        </nya-container>

        <nya-container v-if="img" title="生成成功">
            <img :src="img" class="img">
        </nya-container>
    </div>
</template>

<script>
import domtoimage from 'dom-to-image';
export default {
    name: 'MemeWeibo',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            vip: 'icon_member7',
            daren: true,
            renzheng: true,
            loading: false,
            n: '',
            avatar: require('!file-loader!~/assets/avatar.jpg'),
            vipList: {
                none: '无',
                icon_member1: 'vip1',
                icon_member2: 'vip2',
                icon_member3: 'vip3',
                icon_member4: 'vip4',
                icon_member5: 'vip5',
                icon_member6: 'vip6',
                icon_member7: 'vip7'
            },
            img: ''
        };
    },
    methods: {
        conversion() {
            this.img = '';
            this.loading = true;
            domtoimage
                .toPng(this.$refs.weibo)
                .then(e => {
                    this.img = e;
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                    this.$swal({
                        type: 'error',
                        title: '生成失败',
                        text: err
                    });
                });
        },
        getAvatar(e) {
            this.dataUrl = '';
            this.rdata = '';
            let files = e.target.files;
            if (!files.length) return false;
            const blobUrl = URL.createObjectURL(files[0]);
            this.avatar = blobUrl;
        }
    }
};
</script>

<style lang="scss">
@font-face {
    font-family: 'WBficon';
    src: url('../assets/fonts/weibo_icon2.woff2') format('woff2'),
        url('../assets/fonts/weibo_icon.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.meme-weibo {
    .nya-select {
        width: 100%;
    }
    .nya-checkbox {
        display: flex;
        margin-top: 15px;
    }
    .nya-input {
        margin-top: 15px;
    }
    .weibo-box {
        margin: 15px 0;
        width: 100%;
        overflow-x: auto;
        .c {
            width: 680px;
            padding: 40px;
            box-sizing: border-box;
            background-color: #b0e0fa;
            font-family: 'Microsoft Yahei';
        }
        .W_ficon {
            font-family: 'WBficon' !important;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
        }

        .info-header {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .page-weibo {
            font-size: 14px;
            color: #333;
        }

        .user-box {
            & {
                position: relative;
                width: 600px;
                min-height: 136px;
                -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                border-radius: 2px;
                background-color: #fff;
            }
            .header {
                position: relative;
                min-height: 97px;
                padding: 20px 20px 4px;
                border-bottom: 1px solid #f2f2f5;
            }
            .avatar {
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
            }
            .name {
                margin-right: 6px;
                color: #333;
                font-weight: 700;
            }
            .icon_approve_gold {
                width: 15px;
                height: 14px;
                margin-right: 6px;
                background-image: url('../assets/images/weibo_icon.png');
                background-size: 475px 14px;
            }
            .daren {
                background-position: 0 -125px;
                width: 16px;
                height: 14px;
                margin-right: 4px;
                background-image: url('../assets/images/weibo_icon_2.png');
                background-repeat: no-repeat;
            }
            .icon_member {
                background-position: -125px -125px;
                width: 16px;
                height: 16px;
                margin-right: 4px;
                display: inline-block;
                background-image: url('../assets/images/weibo_icon_2.png');
                background-repeat: no-repeat;
                &.none {
                    display: none;
                }
                &.icon_member1 {
                    background-position: -25px 0;
                }
                &.icon_member2 {
                    background-position: -25px -25px;
                }
                &.icon_member3 {
                    background-position: -25px -50px;
                }
                &.icon_member4 {
                    background-position: -25px -75px;
                }
                &.icon_member5 {
                    background-position: -25px -100px;
                }
                &.icon_member6 {
                    background-position: -25px -125px;
                }
                &.icon_member7 {
                    background-position: -125px -125px;
                }
            }
        }

        .tip {
            color: #999;
            margin-bottom: 16px;
        }

        .info {
            /* float: left; */
            padding-left: 56px;
        }

        .line2 {
            margin-top: 4px;
            margin-bottom: 2px;
            color: gray;
            font-size: 12px;
        }

        .content {
            margin-bottom: 8px;
            width: 500px;
            color: #333;
            line-height: 23px;
            word-wrap: break-word;
        }

        .footer {
            height: 38px;
        }

        .btn {
            float: left;
            height: 22px;
            margin: 7px 0;
            line-height: 22px;
            width: 24%;
            text-align: center;
            border-right: 1px solid #d9d9d9;
            color: #808080;
            font-size: 12px;
            &:last-child {
                border: none;
            }
        }

        .W_ficon {
            position: relative;
            top: 2px;
            margin-right: 2px;
            font-style: normal;
            font-size: 15px;
            vertical-align: top;
        }

        .text {
            position: relative;
            top: 1px;
            line-height: 22px;
        }

        .ficon_arrow_down {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #333;
        }

        .btns {
            margin-bottom: 16px;
        }
    }
    .img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
}
</style>
