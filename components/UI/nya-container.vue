<template>
    <div class="nya-container" :class="{ 'transparent': $store.state.setting.bg.type !== 'none' && $store.state.setting.bg.transparentEl, 'pt': title }">
        <div v-if="title" class="nya-title">
            <i v-if="icon" :class="'eva eva-' + icon"></i>
            <span v-if="title">{{ title }}</span>
            <slot v-else name="title"></slot>
        </div>
        <div v-if="$store.state.inFrames" class="nya-stitle">
            <span>本工具来自：</span>
            <a :href="`${$store.state.env.url}`" target="_blank" rel="noopener noreferrer">{{ $store.state.env.url }}</a>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.nya-container {
    position: relative;
    padding: 25px 32px;
    margin-top: 18px;
    margin-bottom: 50px;
    box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
        1px 3px 8px rgba(39, 44, 49, 0.03);
    background-color: #fff;
    border: none;
    border-radius: 8px;
    &.pt {
        padding-top: 35px;
    }
    &.transparent {
        background-color: rgba($color: #fff, $alpha: 0.65);
    }
    &:last-child {
        margin-bottom: 0;
    }
    .nya-stitle {
        position: absolute;
        right: 15px;
        top: 8px;
        font-size: 13px;
        color: rgb(177, 177, 177);
    }
    .nya-title {
        position: absolute;
        left: 30px;
        top: -18px;
        padding: 8px 15px;
        font-weight: bold;
        font-size: 0;
        background-color: var(--theme);
        color: #fff;
        box-shadow: 0 8px 10px rgba(36, 159, 253, 0.30196);
        border-radius: 8px;
        i {
            margin-right: 5px;
            font-size: 20px;
            vertical-align: middle;
        }
        span {
            font-size: 17px;
            line-height: 20px;
            vertical-align: middle;
        }
    }

    @media (max-width: 600px) {
        padding: 15px;
        &.pt {
            padding-top: 30px;
        }
        .nya-title {
            left: 20px;
        }
    }

    .nya-list {
        margin: 0;
    }
}
</style>
