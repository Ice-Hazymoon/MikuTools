<template>
    <div class="cdnjs">
        <client-only>
            <modal name="viewall" classes="cdnjs_modal" height="auto">
                <div class="title">
                    请自行选择一个速度最佳的使用 <div class="start-speed" @click="startSpeed">
                        开始测速
                    </div>
                </div>
                <div class="cdnlist">
                    <table class="nya-table">
                        <tr>
                            <th>提供者</th>
                            <th>点击复制CDN地址</th>
                            <th>速度</th>
                        </tr>
                        <tr v-for="(item, index) in cdnjsUrl" :key="index">
                            <td>{{ index }}</td>
                            <td class="cdnlink" :title="currentJs" @click="doCopy(item+currentJs)">
                                {{ item+currentJs }}
                            </td>
                            <td>
                                <span v-if="speed[item+currentJs]" :class="getSpeedClass(speed[item+currentJs])">{{ speed[item+currentJs] }}</span>
                                <span v-else>未测试</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </modal>
        </client-only>
        <nya-container title="前端CDN查询">
            <div class="inputbtn">
                <nya-input
                    v-model.trim="query"
                    label="请输入要获取CDN的库名"
                    placeholder="jquery"
                    autocomplete="off"
                    autofocus
                    @keyup.enter="search"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="requestIn"
                    @click="search"
                >
                    {{ requestIn ? '获取中' : '开始获取' }}
                </button>
            </div>
        </nya-container>

        <nya-container v-if="results" title="查询成功">
            <div v-show="!showInfo">
                <h2>共找到 {{ results.total }} 个库</h2>
                <table class="nya-table">
                    <tr>
                        <th>名称</th>
                        <th>Latest版本</th>
                        <th>查询全部信息</th>
                    </tr>
                    <tr v-for="(item, index) in results.results" :key="index">
                        <td>{{ item.name }}</td>
                        <td class="latest">
                            <div :title="catUrl(item.latest)" @click="viewAll(catUrl(item.latest))">
                                {{ catUrl(item.latest) }}
                            </div>
                        </td>
                        <td class="view-all" @click="queryAll(item.name)">
                            查询所有版本
                        </td>
                    </tr>
                </table>
            </div>

            <div v-show="showInfo" class="show-info">
                <div class="back nya-btn" @click="showInfo = false">
                    <i class="eva eva-arrow-back-outline"></i>
                    <span>返回</span>
                </div>

                <ul v-if="allInfo" class="info">
                    <li v-if="allInfo.name">
                        <span class="title">名称：</span>
                        <span>{{ allInfo.name }}</span>
                    </li>
                    <li v-if="allInfo.homepage">
                        <span class="title">主页：</span>
                        <a :href="allInfo.homepage" target="_blank" rel="noopener noreferrer">{{ allInfo.homepage }}</a>
                    </li>
                    <li v-if="allInfo.description">
                        <span class="title">简介：</span>
                        <span>{{ allInfo.description }}</span>
                    </li>
                    <li v-if="allInfo.repository">
                        <span class="title">仓库：</span>
                        <span>{{ allInfo.repository.type }} / {{ allInfo.repository.url }}</span>
                    </li>
                    <li v-if="allInfo.license">
                        <span class="title">协议：</span>
                        <span>{{ allInfo.license }}</span>
                    </li>
                    <li v-if="allInfo.author">
                        <span class="title">作者：</span>
                        <span>{{ allInfo.author.name }} / <a :href="allInfo.author.url" target="_blank" rel="noopener noreferrer">{{ allInfo.author.url }}</a></span>
                    </li>
                    <li v-if="allInfo.autoupdate">
                        <span class="title">自动更新：</span>
                        <span>{{ allInfo.autoupdate.type }} / {{ allInfo.autoupdate.target }}</span>
                    </li>
                </ul>
                <table class="nya-table">
                    <tr>
                        <th>版本号</th>
                        <th>文件名（点击文件名查看CDN地址）</th>
                    </tr>
                    <tr v-for="(item, index) in allInfo.assets" :key="index">
                        <td>{{ item.version }}</td>
                        <td class="view-cdn-list">
                            <ul>
                                <li v-for="file in item.files" :key="file" @click="viewAll2(allInfo.name, item.version, file)">
                                    {{ file }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>数据来自：<a href="https://cdnjs.com/" target="_blank" rel="noopener noreferrer">https://cdnjs.com/</a></li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'Template',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            query: '',
            results: null,
            allInfo: '',
            requestIn: false,
            currentJs: '',
            cdnjsUrl: {
                'css.loli.net': 'https://cdnjs.loli.net/ajax/libs/',
                'cdnjs.net': 'https://libs.cdnjs.net/',
                'www.bootcdn.cn': 'https://cdn.bootcss.com/',
                'cdn.baomitu.com': 'https://lib.baomitu.com/',
                'www.staticfile.org': 'https://cdn.staticfile.org/'
            },
            speed: {},
            showInfo: false
        };
    },
    methods: {
        search() {
            if (!this.query) return;
            this.requestIn = true;
            this.$axios
                .get(`https://api.cdnjs.com/libraries?search=${this.query}`)
                .then(e => {
                    if (e.data.total > 0) {
                        this.results = e.data;
                    } else {
                        this.$modal.show('dialog', {
                            title: '没有找到',
                            text: `ERROR: 没有找到相关库，请确认名称是否正确`
                        });
                    }
                    this.requestIn = false;
                })
                .catch(err => {
                    this.$modal.show('dialog', {
                        title: '查询失败',
                        text: `ERROR: ${err}`
                    });
                    this.requestIn = false;
                });
        },
        queryAll(name) {
            this.$store.commit('SET_STORE', {
                key: 'globalLoading',
                value: true
            });
            this.$axios
                .get(`https://api.cdnjs.com/libraries/${name}`)
                .then(e => {
                    this.$store.commit('SET_STORE', {
                        key: 'globalLoading',
                        value: false
                    });
                    this.allInfo = e.data;
                    this.showInfo = true;
                })
                .catch(err => {
                    this.$store.commit('SET_STORE', {
                        key: 'globalLoading',
                        value: false
                    });
                    this.$modal.show('dialog', {
                        title: '查询失败',
                        text: `ERROR: ${err}`
                    });
                });
        },
        catUrl(url) {
            return url.replace('https://cdnjs.cloudflare.com/ajax/libs/', '');
        },
        viewAll2(n, v, f) {
            this.currentJs = `${n}/${v}/${f}`;
            this.$modal.show('viewall');
        },
        viewAll(name) {
            this.currentJs = name;
            this.$modal.show('viewall');
        },
        startSpeed() {
            Object.keys(this.cdnjsUrl).forEach(async cu => {
                let url = this.cdnjsUrl[cu] + this.currentJs;
                let stime = new Date().getTime();
                this.$set(this.speed, url, '测速中');
                this.$axios
                    .get(`${url}?timestamp=${new Date().getTime()}`)
                    .then(() => {
                        let entime = new Date().getTime();
                        this.$set(this.speed, url, entime - stime + 'ms');
                    })
                    .catch(() => {
                        this.speed[url] = '失败';
                    });
            });
        },
        getSpeedClass(time) {
            let num = parseInt(time);
            if (isNaN(num)) {
                return '';
            } else {
                if (num <= 100) {
                    return 'nya-c-success';
                } else if (num > 100 && num < 300) {
                    return 'nya-c-wrning';
                } else {
                    return 'nya-c-danger';
                }
            }
        },
        doCopy(text) {
            this.$copyText(text).then(
                () => {
                    this.$noty.success('复制成功');
                },
                () => {
                    this.$noty.error('复制失败，请手动选择复制');
                }
            );
        }
    }
};
</script>

<style lang="scss">
.cdnjs {
    table {
        table-layout: auto;
        width: 100%;
        .latest {
            max-width: 500px;
            div {
                color: var(--theme);
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .view-all {
            cursor: pointer;
        }
    }
    .show-info {
        ul {
            margin: 0;
            padding: 0;
            li {
                list-style: none;
            }
        }
        ul.info {
            margin: 15px 0;
            li {
                line-height: 1.3;
                .title {
                    font-weight: bold;
                }
            }
        }
        .view-cdn-list {
            li {
                cursor: pointer;
            }
        }
    }
    .cdnjs_modal {
        padding: 15px;
        border-radius: 5px;
        background-color: var(--t2);
        max-width: 100%;
        font-size: 18px;
        .title {
            text-align: center;
            margin-bottom: 10px;
            font-weight: bold;
            padding-bottom: 15px;
            border-bottom: 1px solid #dad9d9;
            .start-speed {
                display: inline-block;
                font-size: 14px;
                padding: 2px 8px;
                border: 1px solid var(--border-color);
                margin-left: 5px;
                cursor: pointer;
            }
        }
        table {
            .cdnlink {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 250px;
            }
        }
    }
    .fullversion_modal {
    }
}
</style>
