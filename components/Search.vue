<template>
    <div class="search-component">
        <div class="search" :class="{ transparent: $store.state.setting.bg.type !== 'none' && $store.state.setting.bg.transparentEl, 'focus': focus }">
            <i class="eva eva-search-outline"></i>
            <input
                ref="search"
                :value="value"
                type="search"
                v-bind="$attrs"
                :placeholder="`搜索工具${!$store.state.isMobile.any ? '(Ctrl+F)' : ''}`"
                @change="$emit('change', $event)"
                @input="$emit('input', $event.target.value)"
                @keyup="$emit('keyup', $event)"
                @keyup.enter="enterFirst"
                @focus="focus = true"
                @blur="focus = false"
            >
        </div>

        <nya-container v-if="value" title="搜索结果" icon="search-outline">
            <slot :data="searchList"></slot>
            <p v-show="!searchList.length" class="search-placeholder">
                暂无搜索结果
            </p>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'Search',
    inheritAttrs: false,
    props: {
        value: {
            default: null,
            type: [String, Number]
        }
    },
    data() {
        return {
            focus: false
        };
    },
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                arr = arr.concat(tool.list);
            });
            return arr;
        },
        searchList() {
            if (!this.value) return [];
            let results = [];
            const value = this.value.toLowerCase();
            this.toolsList.forEach(tool => {
                if (this.$route.path !== '/hide_tool' && !this.showBtn(tool))
                    return false;
                if (
                    tool.pinyin.first.find(i => {
                        return i.indexOf(value) >= 0;
                    })
                ) {
                    return results.push(tool);
                }
                if (
                    tool.pinyin.pinyin.find(i => {
                        return i.indexOf(value) >= 0;
                    })
                ) {
                    return results.push(tool);
                }
                if (tool.name.toLowerCase().indexOf(value) >= 0)
                    results.push(tool);
            });
            return results;
        }
    },
    mounted() {
        if (process.browser) window.addEventListener('keydown', this.ctrlF);
    },
    beforeDestroy() {
        if (process.browser) window.removeEventListener('keydown', this.ctrlF);
    },
    methods: {
        ctrlF(e) {
            if (e.keyCode == 70 && e.ctrlKey) {
                e.preventDefault();
                this.$refs.search.focus();
            }
        },
        enterFirst() {
            if (!this.searchList.length) return false;
            this.$emit('enter', this.searchList[0]);
        },
        showBtn(tool) {
            return this.$store.state.setting.hide.indexOf(tool.path) < 0;
        }
    }
};
</script>

<style lang="scss">
.search-component {
    .nya-container {
        margin-bottom: 35px !important;
    }
    .search {
        margin-bottom: 50px;
        margin-top: 18px;
        width: 100%;
        padding: 16px;
        display: flex;
        align-items: center;
        background-color: #fff;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
            1px 3px 8px rgba(39, 44, 49, 0.03);
        box-sizing: border-box;
        border-radius: 8px;
        transition: all 0.3s ease;
        &.transparent {
            background-color: rgba($color: #fff, $alpha: 0.65);
        }
        &.focus {
            background-color: var(--theme);
            color: #fff;
            transform: scale(1.02);
            box-shadow: 0 8px 10px rgba(36, 159, 253, 0.30196);
            input {
                &::placeholder {
                    color: rgb(255, 255, 255);
                }
                color: #fff;
            }
        }
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
            &::placeholder {
                transition: color 0.3s ease;
                padding-left: 5px;
            }
        }
    }
    .search-placeholder {
        position: relative;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        top: -8px;
        letter-spacing: 1.5px;
        width: 100%;
    }
}
</style>
