<script>
import Vue from 'vue/dist/vue.common';
export default {
    props: {
        template: {
            required: true,
            validator() {
                return true;
            }
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    data() {
        return {
            templateRender: null
        };
    },
    watch: {
        template: {
            immediate: true,
            handler() {
                if (process.client) {
                    const res = Vue.compile(
                        `<${this.tag}>${this.template}</${this.tag}>`
                    );
                    this.templateRender = res.render;
                    this.$options.staticRenderFns = [];
                    this._staticTrees = [];
                    for (var i in res.staticRenderFns) {
                        this.$options.staticRenderFns.push(
                            res.staticRenderFns[i]
                        );
                    }
                }
            }
        }
    },
    render(h) {
        if (!this.templateRender) {
            return h('div', 'loading...');
        } else {
            return this.templateRender();
        }
    }
};
</script>
