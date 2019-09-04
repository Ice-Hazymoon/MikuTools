<template>
    <div class="any_rule">
        <nya-container title="正则大全">
            <nya-input v-model.trim="search" fullwidth autofocus label="搜索正则" placeholder="例如：手机" autocomplete="off" />
            <hr>
            <div v-for="(item, index) in rules" v-show="isShow(item)" :key="index" class="rule-item">
                <div class="inputbtn mb-15">    
                    <nya-input v-model.trim="item.test" :class="item.stats" fullwidth :label="`${item.title} <a href='https://github.com/any86/any-rule/issues/new?title=我有更好的正则：${item.title}' target='_blank' rel='noopener noreferrer'>反馈</a>`" :placeholder="`例如：${item.examples.join('、')}`" autocomplete="off" @input="verify(item)" />
                    <button
                        type="button"
                        class="nya-btn"
                        @click="(item.test = '') & (item.stats = '')"
                    >
                        清空
                    </button>
                </div>
                <nya-copy :copy="item.rule.toString()">
                    <span v-text="item.rule"></span>
                </nya-copy>
            </div>
        </nya-container>

        <nya-container title="说明">
            <p>正则数据来自：<a href="https://any86.github.io/any-rule/" target="_blank" rel="noopener noreferrer">正则大全</a></p>
        </nya-container>
    </div>
</template>

<script>
import any_rule from '../utils/RULES';
export default {
    name: 'AnyRule',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            search: '',
            rules: []
        };
    },
    computed: {
        isShow() {
            return function(item) {
                if (!this.search) return true;
                return item.title.indexOf(this.search) >= 0;
            };
        }
    },
    mounted() {
        this.rules = any_rule.map(rule => {
            rule.test = '';
            rule.stats = '';
            return rule;
        });
    },
    methods: {
        verify(item) {
            const { test, rule } = item;
            if (!test) {
                item.stats = '';
            } else if (rule.test(test)) {
                item.stats = 'is-success';
            } else {
                item.stats = 'is-error';
            }
        }
    }
};
</script>

<style lang="scss">
.any_rule {
    .rule-item {
        margin: 25px 0;
        overflow: hidden;
    }
    .nya-input {
        &.is-success input {
            border-color: $c-success;
        }
        &.is-error input {
            border-color: $c-danger;
        }
    }
}
</style>
