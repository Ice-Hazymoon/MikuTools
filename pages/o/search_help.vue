<template>
    <div class="search_help">
        <div ref="mouse" class="mouse">
            <i class="eva eva-navigation-2"></i>
        </div>
        <div class="search-box">
            <img class="logo" :src="s ? Logo[s] : px" alt="Logo">
            <div class="search-input" :class="n === 2 ? 'force' : ''">
                <input ref="input" :value="inputVal" type="search" class="input-box">
                <i ref="searchIcon" class="eva eva-search-outline"></i>
            </div>
        </div>
        <div class="info">
            {{ info[n-1] }}
        </div>
        <div class="footer">
            <span>帮你百度 - BY</span>
            <a :href="$store.state.env.url" target="_blank" rel="noopener noreferrer">MikuTools</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchHelp',
    layout: 'blank',
    head() {
        return {
            title: this.title
        };
    },
    data() {
        return {
            title: `帮你百度 - ${process.env.title}`,
            k: '',
            s: '',
            n: 0,
            px:
                'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
            inputVal: '',
            info: [
                '第一步：找到搜索框，并点击它',
                '第二步：输入想要查找的内容',
                '第三步：点击搜索按钮，立即前往',
                '学会了吗，是不是很简单'
            ],
            Logo: {
                google: require('~/assets/images/search_help/Google.svg'),
                pornhub: require('~/assets/images/search_help/Pornhub.svg'),
                baidu: require('~/assets/images/search_help/Baidu.svg'),
                github: require('~/assets/images/search_help/GitHub.svg')
            }
        };
    },
    computed: {
        url() {
            let k = this.$route.query.k;
            let s = this.$route.query.s;
            if (s === 'github') return `https://github.com/search?q=${k}`;
            if (s === 'google') return `https://www.google.com/search?q=${k}`;
            if (s === 'baidu') return `https://www.baidu.com/s?wd=${k}`;
            if (s === 'pornhub')
                return `https://www.pornhub.com/video/search?search=${k}`;
            return '';
        }
    },
    mounted() {
        if (this.$route.query.s && this.$route.query.k) {
            this.k = this.$route.query.k;
            this.s = this.$route.query.s;
            this.step1();
        } else {
            this.$swal({
                type: 'error',
                title: '出现错误',
                text: `ERROR: 参数不正确`
            });
        }
    },
    methods: {
        step1() {
            this.n++;
            let inputXY = this.$refs.input.getBoundingClientRect();
            this.$refs.mouse.style.transform = `translateX(${inputXY.left +
                20}px) translateY(${inputXY.top + 15}px) scale(-1,1)`;
            setTimeout(this.step2, 2000);
        },
        step2() {
            this.n++;
            this.$refs.mouse.style.opacity = 0.3;
            this.$refs.input.focus();
            setTimeout(() => {
                let s = this.k.split('');
                let keyTime = s.length * 200;
                s.forEach((e, i) => {
                    setTimeout(() => {
                        this.inputVal = this.k.slice(0, i + 1);
                    }, 200 * i);
                });
                setTimeout(this.step3, keyTime + 1000);
            }, 500);
        },
        step3() {
            let searchIconXY = this.$refs.searchIcon.getBoundingClientRect();
            this.$refs.mouse.style.opacity = 1;
            setTimeout(() => {
                this.n++;
                this.$refs.mouse.style.transform = `translateX(${searchIconXY.left -
                    15}px) translateY(${searchIconXY.top}px) scale(-1,1)`;
                setTimeout(this.step4, 2000);
            }, 800);
        },
        step4() {
            this.n++;
            setTimeout(() => {
                window.location.href = this.url;
            }, 1000);
        }
    }
};
</script>

<style lang="scss">
.search_help {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 150px;
    box-sizing: border-box;
    .footer {
        position: fixed;
        left: 0;
        width: 100%;
        text-align: center;
        bottom: 20px;
        font-size: 20px;
    }
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 40px;
        height: 95px;
    }
    .search-box {
        width: 700px;
        max-width: 100%;
        input {
            display: inline-block;
            padding: 15px 20px;
            outline: none;
            border: none;
            background-color: transparent;
            box-sizing: border-box;
        }
        .search-input {
            display: flex;
            align-items: center;
            border-radius: 6px;
            box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
            transition: all 0.3s ease;
            &.force {
                transform: scale(1.08);
            }
            input {
                width: calc(100% - 50px);
            }
            i {
                display: inline-block;
                font-size: 20px;
            }
        }
        @media (max-width: 600px) {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
        }
    }
    .info {
        margin-top: 50px;
        font-size: 25px;
    }
    .mouse {
        position: fixed;
        left: 0;
        top: 0;
        font-size: 40px;
        transform: scale(-1, 1);
        transition: linear all 1s;
    }
}
</style>
