<template>
    <div class="setting">
        <Search v-model="searchText">
            <template slot-scope="data">
                <button
                    v-for="tool in data.data"
                    :key="tool.path"
                    type="button"
                    class="nya-btn"
                    :class="handleClass(tool.path)" @click="hide(tool.path)"
                >
                    {{ tool.name }}
                </button>
            </template>
        </Search>

        <nya-container v-show="!searchText" title="网站工具隐藏">
            <div v-for="(item, index) in $store.state.tools" :key="index">
                <button
                    v-for="tool in item.list"
                    :key="tool.path"
                    type="button"
                    class="nya-btn"
                    :class="handleClass(tool.path)" @click="hide(tool.path)"
                >
                    {{ tool.name }}
                </button>
                <hr>
            </div>
        </nya-container>

        <nya-container title="Explain">
            <ul class="nya-list">
                <li>如果你不希望某些工具在首页显示，可以点击改至透明后进行隐藏</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import Search from '../components/Search';
import _ from 'lodash';
export default {
    name: 'Setting',
    components: {
        Search
    },
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            searchText: ''
        };
    },
    computed: {
        toolsLost() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                arr = arr.concat(tool.list);
            });
            return arr;
        }
    },
    methods: {
        hide(path) {
            if (['/setting', '/links'].includes(path)) {
                this.$modal.show('dialog', {
                    title: '操作失败',
                    text: `ERROR: 该项目无法隐藏`
                });
                return false;
            }
            let hide = _.chain(this.$store.state.setting.hide);
            let flag = hide.indexOf(path).value();
            if (flag === -1) {
                hide.push(path).value();
            } else {
                hide.pull(path).value();
            }
            this.$store.commit('SET_STORE', {
                key: 'setting.hide',
                value: hide.value()
            });
        },
        handleClass(path) {
            return {
                hide: this.$store.state.setting.hide.indexOf(path) !== -1
            };
        }
    }
};
</script>

<style lang="scss">
.setting {
    .search {
        margin-bottom: 40px;
        width: 100%;
        padding: 12px;
        border: 4px solid var(--t1);
        display: flex;
        box-sizing: border-box;
        align-items: center;
        i {
            font-size: 25px;
            margin-right: 15px;
        }
        input {
            width: 100%;
            outline: none;
            border: none;
            box-shadow: none;
            background-color: transparent;
            color: var(--t1);
        }
        @media (max-width: 600px) {
            margin-bottom: 28px;
        }
    }
    .nya-btn {
        margin: 5px;
        &.hide {
            opacity: 0.5;
        }
        @media (max-width: 600px) {
            margin: 5px;
            width: calc(50% - 10px);
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
