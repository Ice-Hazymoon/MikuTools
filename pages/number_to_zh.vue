<template>
    <div class="number_to_zh">
        <nya-container title="数字转中文">
            <nya-input
                v-model.trim="number"
                class="ntz"
                autofocus
                label="输入数字开始转换"
                placeholder="0"
                autocomplete="off"
                type="number"
            />
        </nya-container>
        <nya-container v-if="number!=''" title="结果">
            <table>
                <tbody>
                    <template v-for="chars in hans">
                        <template v-for="(value, index) in chars.data">
                            <tr :key="index+chars.lang+'0'">
                                <td rowspan="2">
                                    {{ chars.lang == 'cn'?'简体':'繁体' }}{{ value.name }}
                                </td>
                                <td>{{ value.encode[0] }}</td>
                            </tr>
                            <tr :key="index+chars.lang+'1'">
                                <td>{{ value.encode[1] }}</td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
        </nya-container>
        <nya-container title="中文转数字">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="hanzi"
                    label="输入中文数字开始转换"
                    placeholder="零"
                    autocomplete="off"
                    type="text"
                    @keyup.enter="isZhNum"
                />
                <button type="button" class="nya-btn" @click="isZhNum">
                    开始转换
                </button>
            </div>
        </nya-container>
        <nya-container v-show="numResult" title="转换成功">
            <pre>{{ numResult }}</pre>
        </nya-container>
        <nya-container title="说明">
            <ul class="nya-list">
                <li>基于 nzh 把数字转换为大小写中文。</li>
                <li>
                    超大数转换中文争议请访问 <a href="https://github.com/cnwhy/nzh#nzh" target="_blank" rel="noopener noreferrer">
                        nzh
                    </a>。
                </li>
                <li>中文转数字仅支持简体大小写汉字。</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import Nzh from 'nzh';

export default {
    name: 'NumberToZh',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            number: '',
            hanzi: '',
            numResult: ''
        };
    },
    computed: {
        hans() {
            const nzhcn = Nzh.cn;
            const nzhhk = Nzh.hk;
            let n = this.number;
            let data = [
                {
                    lang: 'cn',
                    data: [
                        {
                            name: '中文小写',
                            encode: [
                                nzhcn.encodeS(n),
                                nzhcn.encodeS(n, { tenMin: false })
                            ]
                        },
                        {
                            name: '中文大写',
                            encode: [
                                nzhcn.encodeB(n),
                                nzhcn.encodeB(n, { tenMin: true })
                            ]
                        },
                        {
                            name: '金额大写',
                            encode: [
                                nzhcn.toMoney(n, { outSymbol: false }),
                                nzhcn.toMoney(n, {
                                    outSymbol: false,
                                    complete: true
                                })
                            ]
                        }
                    ]
                },
                {
                    lang: 'hk',
                    data: [
                        {
                            name: '中文小写',
                            encode: [
                                nzhhk.encodeS(n),
                                nzhhk.encodeS(n, { tenMin: false })
                            ]
                        },
                        {
                            name: '中文大写',
                            encode: [
                                nzhhk.encodeB(n),
                                nzhhk.encodeB(n, { tenMin: true })
                            ]
                        },
                        {
                            name: '金额大写',
                            encode: [
                                nzhhk.toMoney(n, { outSymbol: false }),
                                nzhhk.toMoney(n, {
                                    outSymbol: false,
                                    complete: true
                                })
                            ]
                        }
                    ]
                }
            ];
            return data;
        }
    },
    methods: {
        isZhNum() {
            if (!this.hanzi.length) {
                this.$swal({
                    type: 'error',
                    title: '转换失败',
                    text: `ERROR: 你还没有输入`
                });
                return;
            }
            const regexlower = /^负?[零一二三四五六七八九十百千万亿]*点?[零一二三四五六七八九]*$/g;
            const regexupper = /^负?[零壹贰叁肆伍陆柒捌玖拾佰仟万亿]*点?[零壹贰叁肆伍陆柒捌玖]*$/g;
            if (regexlower.test(this.hanzi)) {
                this.numResult = Nzh.cn.decodeS(this.hanzi);
            } else if (regexupper.test(this.hanzi)) {
                this.numResult = Nzh.cn.decodeB(this.hanzi);
            } else {
                this.$swal({
                    type: 'error',
                    title: '转换失败',
                    text: `ERROR: 请输入正确的大小写中文数字`
                });
                return;
            }
        }
    }
};
</script>

<style lang='scss'>
.number_to_zh {
    table {
        color: #363636;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        td {
            &[rowspan='2'] {
                text-align: center;
            }
            border: 0.0625rem solid #dbdbdb;
            padding: 0.5em 0.75em;
            video {
                max-width: 100%;
            }
        }
    }
    .ntz {
        width: 100%;
    }
}
</style>
