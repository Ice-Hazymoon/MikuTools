<template>
    <div class="json_editor">
        <div ref="jsonEditor" class="jsonEditor"></div>
        <button class="nya-btn mt-15" @click="download">
            下载 JSON 文件
        </button>
    </div>
</template>

<script>
import 'jsoneditor/dist/jsoneditor.min.css';
import createFile from '~/utils/createFile.js';
let JSONEditor;
if (process.browser) {
    JSONEditor = require('jsoneditor');
}
export default {
    name: 'JsonEditor',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            JSONEditor: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.JSONEditor = new JSONEditor(
                this.$refs.jsonEditor,
                {
                    mode: 'code',
                    modes: ['text', 'code', 'tree', 'form', 'view']
                },
                {
                    Array: [1, 2, 3],
                    Boolean: true,
                    Null: null,
                    Number: 123,
                    Object: { a: 'b', c: 'd' },
                    String: 'Hello World'
                }
            );
        },
        download() {
            createFile(this.JSONEditor.getText(), 'main.json');
        }
    }
};
</script>

<style lang="scss">
.json_editor {
    .jsonEditor {
        height: 600px;
    }
    .nya-btn {
        margin-top: 15px;
    }
}
</style>
