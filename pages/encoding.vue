<template>
    <div class="encoding">
        <nya-container title="文本在线编码解码">
            <nya-input v-model="content" class="mb-15" fullwidth rows="5" type="textarea" autofocus autocomplete="off" label="待处理的内容" placeholder="请输入要处理的内容" />
            <br>
            <nya-select v-model="encodingType" class="mb-15" fullwidth :items="list" label="选择编码方式" />
            <br>
            <button
                type="button"
                class="nya-btn mr-15"
                @click="encoding"
            >
                编码
            </button>
            <button
                type="button"
                class="nya-btn mr-15"
                @click="decoding"
            >
                解码
            </button>
        </nya-container>

        <nya-container v-show="result" title="转换成功">
            <pre>{{ result }}</pre>
        </nya-container>
    </div>
</template>

<script>
import coreValuesEncoder from '~/utils/core-values-encoder.js';
export default {
    name: 'Crypto',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            list: {
                Base64: 'Base64',
                coreValuesEncoder: '社会主义核心价值观'
            },
            encodingType: 'Base64', //加密方式
            content: '', //要处理的内容
            result: '' //输出的结果
        };
    },
    methods: {
        encoding() {
            this.result = this[this.encodingType](true);
        },
        decoding() {
            this.result = this[this.encodingType](false);
        },
        Base64(type) {
            if (type) {
                return Buffer.from(this.content).toString('base64');
            } else {
                return Buffer.from(this.content, 'base64').toString();
            }
        },
        coreValuesEncoder(type) {
            if (type) {
                return coreValuesEncoder.encode(this.content);
            } else {
                return coreValuesEncoder.decode(this.content);
            }
        }
    }
};
</script>
