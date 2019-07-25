<template>
    <div class="autoprefixer">
        <nya-container title="CSS 兼容性处理">
            <nya-input v-model.trim="cssStr" fullwidth rows="5" type="textarea" autofocus label="输入 CSS 代码开始处理" placeholder=".body{background: linear-gradient(to bottom, white, black);}" autocomplete="off" />
            <nya-input v-model.trim="browser" fullwidth label="过滤浏览器 <a href='https://browserl.ist' target='_blank' rel='noopener noreferrer'>https://browserl.ist</a>" placeholder="last 4 version" autocomplete="off" />
            <button type="button" class="nya-btn" :disabled="requestIn" @click="handel">
                {{ requestIn ? '处理中' : '开始处理' }}
            </button>
        </nya-container>

        <nya-container v-if="result" title="处理成功">
            <nya-copy :copy="result">
                <span v-text="result"></span>
            </nya-copy>
        </nya-container>
    </div>
</template>

<script>
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
export default {
    name: 'Autoprefixer',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            cssStr: '',
            requestIn: false,
            result: '',
            browser: 'last 4 version'
        };
    },
    mounted() {
        this.cssStr = `.example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}`;
    },
    methods: {
        handel() {
            if (this.cssStr) {
                this.result = '';
                this.requestIn = true;
                postcss([
                    autoprefixer({
                        browsers: this.browser,
                        grid: 'autoplace'
                    })
                ])
                    .process(this.cssStr)
                    .then(compiled => {
                        this.requestIn = false;
                        this.result = compiled.css;
                    })
                    .catch(error => {
                        this.requestIn = false;
                        this.$modal.show('dialog', {
                            title: '处理失败',
                            text: `ERROR: ${error.toString()}`
                        });
                    });
            } else {
                this.$modal.show('dialog', {
                    title: '处理失败',
                    text: `ERROR: 请输入正确的JS代码`
                });
            }
        }
    }
};
</script>

<style lang="scss">
.autoprefixer {
    .nya-btn,
    .nya-input {
        margin-top: 15px;
    }
}
</style>
