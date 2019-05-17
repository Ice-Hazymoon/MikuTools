<template>
    <div v-show="$route.path !== '/'" class="float-btn">
        <div class="main" :title="collected ? '收藏本工具' : '取消收藏'" @click="collect">
            <i v-if="collected" class="eva eva-star"></i>
            <i v-else class="eva eva-star-outline"></i>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'FloatBtn',
    computed: {
        collected() {
            const path = this.$route.path;
            let flag = this.$store.state.setting.favorites.indexOf(path);
            return flag !== -1;
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
                this.$toasted.show('收藏成功');
            } else {
                favorites.pull(path).value();
                this.$toasted.show('取消收藏成功');
            }
            this.$store.commit('SET_STORE', {
                key: 'setting.favorites',
                value: favorites.value()
            });
        }
    }
};
</script>


<style lang="scss">
.float-btn {
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: 30px;
    .main {
        cursor: pointer;
        width: 60px;
        height: 60px;
        background-color: var(--theme);
        border-radius: 50%;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
            0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 20px;
            color: #eeeeee;
        }
    }
}
</style>
