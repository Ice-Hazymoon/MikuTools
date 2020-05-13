<template>
    <div class="rich_text_editor">
        <client-only>
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" />
            <button class="nya-btn" @click="showCode = !showCode">
                {{ showCode ? '隐藏' : '显示' }} HTML 代码
            </button>
            <div v-if="showCode" class="quill-code">
                <Dynamic class="hljs xml" tag="code" :template="contentCode" />
            </div>
        </client-only>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
let quillEditor;
if (process.browser) {
    quillEditor = require('vue-quill-editor').quillEditor;
}
export default {
    name: 'RichTextEditor',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        quillEditor,
        Dynamic
    },
    data() {
        return {
            showCode: false,
            content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'rtl' }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ font: [] }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ],
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            }
        };
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quill;
        },
        contentCode() {
            return hljs.highlightAuto(this.content).value;
        }
    },
    mounted() {
        this.content = `<h2>MikuTools - 一个轻量的工具集合</h2>`;
    },
    methods: {}
};
</script>

<style lang="scss">
.rich_text_editor {
    .ql-editor {
        min-height: 300px;
        max-height: 600px;
        background-color: var(--t2);
    }
    .ql-toolbar {
        border-color: var(--t1);
        background-color: var(--t2);
        .ql-formats {
            .ql-fill {
                fill: var(--t1);
            }
            .ql-stroke {
                stroke: var(--t1);
            }
            .ql-picker {
                color: var(--t1);
            }
            .ql-active {
                color: var(--theme);
                .ql-fill {
                    fill: var(--theme);
                }
                .ql-stroke {
                    stroke: var(--theme);
                }
            }
        }
    }
    .ql-container.ql-snow {
        border-color: var(--t1);
    }
    .nya-btn {
        margin: 15px 0;
    }
    .quill-code {
        width: 100%;
        border: none;
        height: auto;
        > code {
            box-sizing: border-box;
            display: block;
            width: 100%;
            margin: 0;
            padding: 1rem;
            border: 1px solid var(--t1);
            border-radius: 0;
            min-height: 10rem;
            overflow-y: auto;
            resize: vertical;
        }
    }
}
</style>
