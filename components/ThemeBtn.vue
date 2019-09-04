<template>
    <div v-if="!$store.state.inFrames" class="theme-btn">
        <div class="line"></div>
        <div v-if="$store.state.dark" class="type-icon" @click="switchTheme">
            <i class="eva eva-sun-outline"></i>
        </div>
        <div v-else class="type-icon" @click="switchTheme">
            <i class="eva eva-moon-outline"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThemeBtn',
    methods: {
        switchTheme() {
            this.$store.commit('SET_STORE', {
                key: 'dark',
                value: !this.$store.state.dark
            });
        }
    }
};
</script>

<style lang="scss">
.theme-btn {
    position: fixed;
    left: 40px;
    top: -10px;
    transition: all 0.3s ease;
    opacity: 0.6;
    @media (min-width: 600px) {
        &:hover {
            top: 0;
            opacity: 1;
        }
    }
    @media (max-width: 600px) {
        &:active {
            top: 0;
            opacity: 1;
        }
    }
    .line {
        width: 0;
        border: 2px dashed #5ca0d3;
        height: 50px;
    }
    .type-icon {
        position: relative;
        left: -20px + 2px;
        width: 40px;
        height: 40px;
        background-color: #5ca0d3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
    }
}
</style>
