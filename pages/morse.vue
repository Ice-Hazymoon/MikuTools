<template>
    <div class="morse">
        <nya-container title="摩斯电码转换">
            <nya-input
                v-model.trim="value"
                label="请输入摩斯电码"
                placeholder="...././.-../.-../---/--/../-.-/..-/-/---/---/.-../..."
                autocomplete="off"
                autofocus
                fullwidth
            />
            <nya-checkbox v-model="type" label="解码" />
        </nya-container>

        <nya-container v-show="result" title="转换结果">
            <pre>{{ result }}</pre>
        </nya-container>
        
        <nya-container title="说明">
            <ul class="nya-list">
                <li><b>如果内容包含中文，仅在本平台使用，可能其他人将无法识别</b></li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import morse from '~/utils/morse.js';
export default {
    name: 'Morse',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            value: '',
            downloadUrl: '',
            requestIn: false,
            type: false // true:de false:en
        };
    },
    computed: {
        result() {
            return this.type
                ? morse.decode(this.value)
                : morse.encode(this.value);
        }
    },
    methods: {}
};
</script>

<style lang="scss">
.morse {
    .nya-checkbox {
        margin-top: 15px;
    }
}
</style>
