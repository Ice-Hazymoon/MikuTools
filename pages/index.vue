<template>
    <div class="home">
        <Search v-model="searchText">
            <template slot-scope="data">
                <nuxt-link
                    v-for="(tool, index) in data.data"
                    v-show="showBtn(tool)"
                    :key="index"
                    :to="tool.path"
                    class="nya-btn"
                >
                    {{ tool.name }}
                </nuxt-link>
            </template>
        </Search>

        <Favorites v-show="!searchText" />

        <nya-container
            v-for="(item, index) in $store.state.tools"
            v-show="!searchText && showSection(item)"
            :key="index"
            :icon="item.icon"
            :title="item.title"
        >
            <template v-for="(tool, index2) in item.list">
                <nuxt-link
                    v-if="showBtn(tool)"
                    :key="index2"
                    :title="tool.name"
                    :to="tool.path"
                    class="nya-btn"
                    :thanos="tool.name"
                    :class="{'hot': tool.hot}"
                >
                    {{ tool.name }}
                </nuxt-link>
            </template>
        </nya-container>

        <nya-container title="公告" icon="volume-down-outline">
            <ul class="nya-list">
                <li>欢迎将本站收藏到收藏夹，以便以后使用</li>
                <li>
                    如果遇到无法使用或者样式问题，请更换浏览器后重试，推荐使用
                    <b>Chrome</b> 浏览器，对 iOS 设备兼容性可能不太好
                </li>
                <li>
                    GitHub：
                    <a
                        href="https://github.com/Ice-Hazymoon/MikuTools"
                        target="_blank"
                        rel="noopener noreferrer"
                    >https://github.com/Ice-Hazymoon/MikuTools</a>
                </li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import Favorites from '../components/Favorites';
import Search from '../components/Search';
export default {
    name: 'Home',
    components: {
        Favorites,
        Search
    },
    head() {
        return {
            title: this.title
        };
    },
    data() {
        return {
            title: `${process.env.title} - ${process.env.description}`,
            searchText: ''
        };
    },
    methods: {
        showSection(item) {
            let n = 0;
            item.list.forEach(i => {
                if (this.$store.state.setting.hide.indexOf(i.path) !== -1) n += 1;
            });
            return !(n === item.list.length);
        },
        showBtn(tool) {
            return (this.$store.state.setting.hide.indexOf(tool.path) === -1);
        }
    }
};
</script>

<style lang="scss">
.home {
    ._ad {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nya-btn {
        position: relative;
        font-weight: bold;
        margin: 7px;
        width: calc(20% - 14px);
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.3s ease;
        &.hot {
            &::after {
                $w: 8px;
                content: '';
                position: absolute;
                right: $w / 2;
                top: $w / 2;
                display: block;
                width: $w;
                height: $w;
                border-radius: 50%;
                background-color: var(--theme);
            }
        }
        &:hover {
            transform: translateY(-2px);
            box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
                1px 6px 12px rgba(39, 44, 49, 0.04);
        }
        @media (max-width: 1050px) {
            width: calc(25% - 14px);
        }
        @media (max-width: 900px) {
            width: calc(100% / 3 - 14px);
        }
        @media (max-width: 700px) {
            box-shadow: none;
            margin: 5px;
            width: calc(50% - 10px);
        }
    }
}
</style>
