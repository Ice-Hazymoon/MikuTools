<template>
    <div class="markdown">
        <client-only>
            <mavon-editor
                ref="md"
                v-model="content"
                class="typo"
                :box-shadow="false"
                :subfield="true"
                :default-open="isMobile ? 'edit' : 'preview'"
                :external-link="externalLink"
                @change="handleHtml"
            />
        </client-only>
        <div class="btn-list">
            <button class="nya-btn" @click="downloadHtml">
                下载 HTML 文件
            </button>
            <button class="nya-btn" @click="downloadMd">
                下载 MD 文件
            </button>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import createFile from '~/utils/createFile.js';
export default {
    name: 'Markdown',
    components: {
        mavonEditor
    },
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            content: '',
            html: '',
            markdownOption: {
                bold: true
            },
            externalLink: false,
            isMobile: false
        };
    },
    mounted() {
        if (process.browser) {
            if (window.innerWidth < 700) {
                this.isMobile = true;
            }
        }
        this.$nextTick(() => {
            this.$refs.md.markdownIt.set({
                highlight: function(str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        return hljs.highlight(lang, str).value;
                    }
                    return '';
                }
            });
        });
    },
    methods: {
        downloadHtml() {
            createFile(this.html, 'markdown.html');
        },
        downloadMd() {
            createFile(this.content, 'markdown.md');
        },
        handleHtml(val, render) {
            this.html = render;
        }
    }
};
</script>

<style lang="scss">
.markdown {
    margin-bottom: 15px;
    pre {
        font-family: monospace, monospace;
    }
    .v-note-op {
        box-sizing: border-box;
    }
    .v-note-edit {
        min-height: 600px;
    }
    .v-show-content {
        color: #000;
        background-color: #fbfbfb;
        pre {
            color: #fbfbfb;
        }
    }
    .v-note-panel,
    .v-note-wrapper,
    textarea,
    .v-note-op {
        background-color: var(--t2) !important;
        color: var(--t1) !important;
    }
    .v-note-panel,
    .v-note-op {
        border-color: var(--t1) !important;
    }
    .btn-list {
        margin-top: 15px;
        font-size: 0;
        button {
            margin: 0;
            margin-right: 15px;
        }
    }
}
</style>
