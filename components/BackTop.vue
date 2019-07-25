<template>
    <div class="back-top" @click="backTop">
        <div class="lt">
            <i class="eva eva-arrow-upward"></i>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            inTop: true
        };
    },
    mounted() {
        window.addEventListener(
            'scroll',
            () => {
                const element = document.querySelector('.back-top');
                if (!element) return false;
                if (window.scrollY > 1000 && this.inTop) {
                    element.classList.add('x');
                } else {
                    element.classList.remove('x');
                }
            },
            {
                passive: true
            }
        );
    },
    methods: {
        backTop() {
            if (this.inTop) {
                const jump = require('jump.js').default;
                // 缓动算法
                const easeInOut = (t, b, c, d) => {
                    return t == d
                        ? b + c
                        : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
                };
                this.inTop = false; // 阻止多次点击返回顶部
                this.$store.commit('disabledMouseWheel', true);
                jump(document.body, {
                    duration: 800,
                    offset: 0,
                    callback: () => {
                        this.inTop = true;
                        this.$store.commit('disabledMouseWheel', false);
                    },
                    easing: easeInOut,
                    a11y: false
                });
            }
        }
    }
};
</script>

<style lang="scss">
$width: 130px;
$media-width: 100px;
.back-top {
    z-index: 10;
    cursor: pointer;
    position: fixed;
    width: $width;
    height: $width;
    right: -$width;
    bottom: -$width;
    border-radius: 50%;
    transition: 0.3s ease all;
    .lt {
        width: $width / 2;
        height: $width / 2;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            position: relative;
            color: #ffffff;
            left: 5px;
            top: 8px;
            i::before {
                font-size: 28px !important;
            }
        }
    }
    &:active {
        transform: scale(0.95);
    }
    &:hover {
        span {
            animation: ease forwards infinite 0.8s back-top;
        }
        @keyframes back-top {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(0);
            }
        }
    }
    &.x {
        right: -$width / 2 - 8px;
        bottom: -$width / 2;
    }
}
</style>
