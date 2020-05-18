<template>
    <div class="nya-circle">
        <svg
            style="transform: rotate(-90deg)"
            :width="width"
            :height="width"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                :r="(width-radius)/2"
                :cy="width/2"
                :cx="width/2"
                :stroke-width="radius"
                :stroke="backgroundColor"
                fill="none"
            />
            <circle
                ref="$bar"
                :r="(width-radius)/2"
                :cy="width/2"
                :cx="width/2"
                :stroke="barColor"
                :stroke-width="radius"
                :stroke-linecap="isRound ? 'round' : 'square'"
                :stroke-dasharray="(width - radius) * 3.14"
                :stroke-dashoffset="(width - radius) * 3.14 * (100 - progress) / 100"
                fill="none"
            />
        </svg>
        <div class="center" :style="{ 'font-size': `${fontSize}px`, color: fontColor }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [Number, String],
            default: 250
        }, // 圆的大小
        radius: {
            type: [Number, String],
            default: 20
        }, // 进度条厚度
        fontSize: {
            type: [Number, String],
            default: 50
        }, // 字体大小
        fontColor: {
            type: String,
            default: '#fff'
        }, // 字体颜色
        progress: {
            type: [Number, String],
            default: 0
        }, // 进度条百分比
        barColor: {
            type: String,
            default: '#fff'
        }, // 进度条颜色
        backgroundColor: {
            type: String,
            default: 'rgba(255, 255, 255, 0.2)'
        }, // 背景颜色
        isRound: {
            // 是否是圆形画笔
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            id: null
        };
    },
    computed: {
        styles() {
            return {};
        }
    },
    mounted() {
        this.id = this.$shortid.generate();
    }
};
</script>

<style lang="scss">
.nya-circle {
    position: relative;
    .center {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    circle:nth-child(2) {
        transition: all 0.1s linear;
    }
}
</style>
