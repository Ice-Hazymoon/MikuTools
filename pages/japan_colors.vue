<template>
    <div class="japan_colors">
        <nya-container title="日本の伝統色">
            <nya-input
                v-model.trim="value"
                label="查找传统色"
                placeholder="撫子 / NADESHIKO"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="colors.length" title="颜色列表">
            <div v-for="(item, index) in colors" :key="index" class="color">
                <div class="color-block">
                    <div class="bg" :style="{'background-color': item.hex, 'box-shadow': `0px 15px 30px 0px rgba(${item.RGB.join(',')}, .8)`}"></div>
                    <div class="name-n">
                        {{ item.name }}
                    </div>
                    <div class="copy">
                        <div title="点击复制RGB" @click="doCopy(item.RGB.join(','), `复制RGB值成功`)">
                            复制RGB
                        </div>
                        <div title="点击复制HEX" @click="doCopy(item.hex, `复制HEX值成功`)">
                            复制HEX
                        </div>
                        <div title="点击复制CMYK" @click="doCopy(item.CMYK.join(','), `复制CMYK值成功`)">
                            复制CMYK
                        </div>
                    </div>
                </div>
                <div class="name">
                    {{ item.name }}
                </div>
            </div>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>数据来自：<a href="http://nipponcolors.com" target="_blank" rel="noopener noreferrer">日本の伝統色</a></li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import colors from '~/utils/japan_colors';
export default {
    name: 'JapanColors',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            colorList: colors,
            value: '',
            results: ''
        };
    },
    computed: {
        colors() {
            if (!this.value) return this.colorList;
            return this.colorList.filter(e => {
                return (
                    e.name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.value.toLowerCase()) >= 0 ||
                    e.pinyin
                        .toString()
                        .toLowerCase()
                        .indexOf(this.value.toLowerCase()) >= 0
                );
            });
        }
    },
    methods: {
        doCopy(color, text) {
            this.$copyText(color).then(
                () => {
                    this.$noty.success(text);
                },
                () => {
                    this.$noty.error('复制失败，请手动选择复制');
                }
            );
        },
        handleRGB(i) {
            return `${i.join(',')}`;
        }
    }
};
</script>

<style lang="scss">
.japan_colors {
    .color {
        position: relative;
        width: calc(100% / 6 - 20px);
        display: inline-block;
        margin: 10px;
        .color-block {
            position: relative;
        }
        .bg {
            height: 100px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        .copy {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            box-sizing: border-box;
            padding: 15px 20px;
            opacity: 0;
            transition: all 0.3s ease;
            background-color: rgba($color: #000000, $alpha: 0.5);
            color: #ffffff;
            font-size: 14px;
            line-height: 1.8;
            div {
                cursor: pointer;
                transition: 0.15s ease color;
                &:hover {
                    color: var(--theme);
                }
            }
        }
        .name {
            text-align: center;
            margin-top: 10px;
        }
        .name-n {
            display: none;
        }
        &:hover {
            .copy {
                opacity: 1;
            }
            .bg {
                box-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0) !important;
            }
        }
        @media (max-width: 1080px) {
            width: calc(100% / 5 - 20px) !important;
        }
        @media (max-width: 880px) {
            width: calc(100% / 4 - 20px) !important;
        }
        @media (max-width: 680px) {
            width: calc(100% / 3 - 20px) !important;
            .name {
                display: none;
            }
            .color-block {
                .bg {
                    height: 60px;
                    box-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0) !important;
                }
                .copy {
                    opacity: 1;
                    color: var(--t1);
                    padding: 5px 0;
                    line-height: 1.5;
                    position: relative;
                    top: 100%;
                    width: 100%;
                    box-sizing: border-box;
                    background-color: transparent !important;
                }
                .name-n {
                    display: block;
                    margin-top: 10px;
                    font-weight: bold;
                }
            }
        }
        @media (max-width: 480px) {
            width: calc(100% / 3 - 16px) !important;
            margin: 8px !important;
        }
    }
}
</style>
