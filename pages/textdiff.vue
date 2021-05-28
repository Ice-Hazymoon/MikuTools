<template>
    <div class="textdiff">
        <nya-container title="文本对比">
            <nya-input
                v-model="oldString"
                class="mb-15"
                fullwidth
                rows="5"
                type="textarea"
                autofocus
                autocomplete="off"
                label="旧文本"
                placeholder="console.log('mikutools')"
            />
            <nya-input
                v-model="newString"
                class="mb-15"
                fullwidth
                rows="5"
                type="textarea"
                autocomplete="off"
                label="新文本"
                placeholder="console.info('Miku Tools')"
            />
            <div class="nya-btn" @click="diff">
                生成对比
            </div>
        </nya-container>

        <nya-container v-if="results.length" title="对比结果">
            <Dynamic :template="results" />
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>
                    使用：<a
                        href="https://github.com/kpdecker/jsdiff"
                        target="_blank"
                        rel="noopener noreferrer"
                    >jsdiff</a>生成对比数据
                </li>
                <li>
                    使用：<a
                        href="https://github.com/rtfpessoa/diff2html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >diff2html</a>渲染对比结果
                </li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';

import { createPatch } from 'diff';
import * as Diff2Html from 'diff2html';

import 'diff2html/bundles/css/diff2html.min.css';
export default {
    name: 'TextDiff',
    components: {
        Dynamic
    },
    data() {
        return {
            oldString: '',
            newString: '',
            results: ''
        };
    },
    methods: {
        diff() {
            if (!this.oldString) {
                this.$noty.error('请输入旧文本');
                return;
            } else if (!this.newString) {
                this.$noty.error('请输入新文本');
                return;
            }
            const input = createPatch('文件', this.oldString, this.newString);
            const diffhtml = Diff2Html.html(input, {
                drawFileList: false,
                matching: 'lines',
                outputFormat: 'side-by-side',
                diffTooBigMessage: '文本差异过大'
            });
            if (diffhtml.includes('File without changes')) {
                this.$noty.error('没有找到差异');
                return;
            }
            this.results = diffhtml;
        }
    }
};
</script>

<style>
.d2h-file-header {
    display: none;
}
.d2h-file-wrapper {
    border: none;
    border-radius: none;
    margin-bottom: none;
}
</style>
