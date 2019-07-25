<template>
    <nya-container v-if="$store.state.welcome" class="welcome">
        <h2>欢迎使用MikuTools</h2>
        <p>
            目前共开发了数十款有趣的小功能，数量还在持续增加中。如果觉得某一款不错，不妨安利给他人使用。
        </p>
        <div class="close" title="关闭" @click="close">
            <i class="eva eva-close-outline"></i>
        </div>
    </nya-container>
</template>

<script>
export default {
    name: 'Welcome',
    methods: {
        close() {
            this.$store.commit('SET_STORE', {
                key: 'welcome',
                value: false
            });
        }
    }
};
</script>

<style lang="scss">
.nya-container.welcome {
    margin-bottom: 32px;
    margin-top: 18px;
    .close {
        cursor: pointer;
        $width: 30px;
        position: absolute;
        right: -12px;
        top: -12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: $width;
        height: $width;
        border-radius: 50%;
        color: #fff;
        background-color: var(--theme);
        box-shadow: 0 8px 10px rgba(36, 159, 253, 0.30196);
    }
}
</style>
