<template>
    <div class="index_page" :class="{ 'hasbg': $store.state.setting.bg.type !== 'none', 'in-frames': ($store.state.inFrames && $route.path !== '/'), hide: !$store.state.loaded }">
        <!-- in frames -->
        <style v-if="$store.state.inFrames && $route.path !== '/'">
            body {
            background-color: transparent;
            }
        </style>

        <!-- outdatedbrowser -->
        <link rel="stylesheet" href="/css/outdatedbrowser.min.css" />
        <div id="outdated"></div>
        <script src="/js/outdatedbrowser.js"></script>
        
        <!-- 路由过渡 -->
        <style v-if="$store.state.setting.animations">
            .page-enter-active,
            .page-leave-active {
            transition: all .25s;
            }

            .page-leave-to,
            .page-enter{
            transform: translateY(20px);
            opacity: 0;
            }

            .page-enter-to,
            .page-leave{
            transform: translateY(0);
            opacity: 1;
            }
        </style>

        <!-- 自定义背景 -->
        <div class="bgimg" :style="{ 'background-image': `url(${backgroundImage})`, 'filter': `blur(${$store.state.setting.bg.blur}px)`, 'opacity': $store.state.setting.bg.opacity / 100 }"></div>
        <!-- 夜间模式样式 -->
        <style v-if="$store.state.dark">
            :root {
            --t1: #989898;
            --t2: #1f1f1f;
            color: #989898;
            }
        </style>
        <style v-else>
            :root {
            --t1: #2f3e4c;
            --t2: #ffffff;
            color: #2f3e4c;
            }
        </style>
        <!-- 夜间模式蒙层 -->
        <div v-if="$store.state.dark" class="dark-layer"></div>
        <main>
            <!-- 背景蒙层 -->
            <div v-if="$store.state.setting.bg.layer" class="bg-layer"></div>
            <Navbar />
            <nuxt class="view" />
            <Vfooter v-show="$route.path === '/'" />
        </main>
        <!-- 自定义CSS -->
        <style v-if="$store.state.setting.css">
            {{ $store.state.setting.css }}
        </style>
        <!-- 自定义JS -->
        <script v-if="$store.state.setting.js" type="text/javascript" charset="utf-8" v-text="$store.state.setting.js"></script>
        <client-only>
            <Dialog scrollable :click-to-close="false" />
        </client-only>
        <div v-show="$store.state.globalLoading" class="view-loading">
            <nya-loading />
        </div>
        <FloatBtn />
        <ThemeBtn />
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Dialog from '../components/Dialog';
import FloatBtn from '../components/FloatBtn';
import isMobile from 'ismobilejs';
import Vfooter from '~/components/Footer';
import ThemeBtn from '~/components/ThemeBtn';
export default {
    name: 'Index',
    components: {
        Navbar,
        Dialog,
        FloatBtn,
        Vfooter,
        ThemeBtn
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        backgroundImage() {
            const setting = this.$store.state.setting.bg;
            let url;
            if (setting.type === 'bing') {
                url = '//api.dujin.org/bing/1920.php';
            } else if (setting.type === 'anime') {
                url =
                    '//api.btstu.cn/sjbz/?lx=dongman&k=' +
                    Math.random()
                        .toString(10)
                        .substring(2);
            } else if (setting.type === 'custom') {
                url = setting.customUrl;
            } else if (setting.type === 'upload') {
                url = setting.upload.url;
            } else url = '';
            return url;
        }
    },
    watch: {
        '$store.state.dark'(val) {
            if (val) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    },
    mounted() {
        this.loading = false;

        // 设置UA
        this.$store.commit('SET_STORE', {
            key: 'isMobile',
            value: isMobile
        });

        // 判断frames
        if (process.browser) {
            if (window.frames.length != parent.frames.length) {
                // window.open(this.$store.state.env.url);
                this.$store.commit('SET_STORE', {
                    key: 'inFrames',
                    value: true
                });
            }
        }

        setTimeout(() => {
            this.$nextTick(() => {
                this.$store.commit('SET_STORE', {
                    key: 'loaded',
                    value: true
                });
                if (this.$store.state.setting.inNewTab === null) {
                    this.$store.commit('SET_STORE', {
                        key: 'setting.inNewTab',
                        value: !this.$store.state.isMobile.any
                    });
                }
            });
        }, 0);
    }
};
</script>

<style lang="scss">
.in-frames {
    main {
        padding: 0 !important;
        margin: 0 !important;
    }
    .nya-container {
        margin-top: 18px;
        box-shadow: none;
        border: 1px solid #ebebeb;
    }
    .navbar,
    .vfooter,
    .float-btn {
        display: none !important;
    }
}
.index_page {
    min-height: 100%;
    &.hide {
        opacity: 0;
    }
    .view + .nya-container {
        margin-top: 50px;
    }
    .dark-layer {
        position: fixed;
        pointer-events: none;
        background-color: rgba($color: #000000, $alpha: 0.3);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 999;
    }
    .view-loading {
        z-index: 999;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #ffffff, $alpha: 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    main {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 20px;
        padding-bottom: 20px;
    }
    .bgimg {
        z-index: -1;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .bg-layer {
        z-index: -1;
        opacity: 0.75;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        min-height: 100vh;
    }
}
</style>
