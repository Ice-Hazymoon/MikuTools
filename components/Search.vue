<template>
    <div class="search-component">
        <div class="search">
            <i class="eva eva-search-outline"></i>
            <input
                :value="value"
                type="search"
                placeholder="搜索工具"
                @change="$emit('change', $event)"
                @input="$emit('input', $event.target.value)"
                @keyup="$emit('keyup', $event)"
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
    props: {
        value: {
            default: null,
            type: [String, Number]
        }
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
            this.toolsList.forEach(tool => {
                if (this.showBtn(tool)) {
                    if (
                        tool.name
                            .toLowerCase()
                            .indexOf(this.value.toLowerCase()) !== -1
                    ) {
                        results.push(tool);
                    }
                }
            });
            return results;
        }
    },
    methods: {
        showBtn(tool) {
            return (this.$store.state.setting.hide.indexOf(tool.path) === -1);
        }
    }
};
</script>

<style lang="scss">
.search-component {
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
