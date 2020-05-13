<template>
    <div class="linux_command">
        <client-only>
            <modal name="readCommand" classes="readCommand_modal" height="auto" width="800px" scrollable adaptive>
                <div class="title">
                    {{ command }} 命令详情
                </div>
                <Dynamic class="content typo" :template="content" />
                <div class="close-modal" @click="$modal.hide('readCommand')">
                    关闭
                </div>
            </modal>
        </client-only>
        <nya-container title="Linux 命令查询">
            <nya-input
                v-model.trim="searchVal"
                :label="geting ? '获取数据中···' : '请输入要查询的命令'"
                placeholder="alias"
                autocomplete="off"
                autofocus
                fullwidth
            />
            <div v-show="searchVal" class="nya-subtitle">
                搜索结果（点击查看详情）
            </div>
            <ul v-show="searchVal" class="nya-list">
                <li v-for="(item, index) in searchResults" :key="index" @click="query(item)">
                    <b>{{ data[item].n }}</b>：{{ data[item].d }}
                </li>
            </ul>
        </nya-container>

        <nya-container v-if="results" title="查询成功">
            <a :href="results" target="_blank" rel="noopener noreferrer">
                {{ results }}
            </a>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>
                    数据来自 <a href="https://github.com/jaywcjlove/linux-command" target="_blank" rel="noopener noreferrer">
                        jaywcjlove/linux-command
                    </a>
                </li>
                <li>部分地区无法访问unpkg的cdn，如果出现网络错误请自行更换环境使用</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import md from '~/utils/markdown.js';
import Dynamic from '@/components/Dynamic';
export default {
    name: 'LinuxCommand',
    components: {
        Dynamic
    },
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            geting: true,
            data: {},
            searchVal: '',
            command: null,
            commandData: null,
            results: ''
        };
    },
    computed: {
        searchResults() {
            return Object.keys(this.data).filter(comm => {
                return (
                    this.data[comm].n
                        .toString()
                        .toLowerCase()
                        .indexOf(this.searchVal.toLowerCase()) >= 0
                );
            });
        },
        content() {
            return this.commandData ? md(this.commandData) : '';
        }
    },
    mounted() {
        if (this.$db.get('linux_command').value()) {
            const currentDate = dayjs();
            const storageDate = this.$db.get('linux_command.time').value();
            if (currentDate.diff(dayjs.unix(storageDate), 'day') > 1) {
                this.getData();
            } else {
                this.data = this.$db.get('linux_command.data').value();
                this.geting = false;
            }
        } else {
            this.getData();
        }
    },
    methods: {
        getData() {
            this.$axios
                .get('https://unpkg.com/linux-command@1.2.5/dist/data.json')
                .then(e => {
                    this.data = e.data;
                    this.$db
                        .set('linux_command', {
                            time: dayjs().unix(),
                            data: e.data
                        })
                        .write();
                    this.geting = false;
                })
                .catch(err => {
                    this.$swal({
                        type: 'error',
                        title: '下载失败',
                        text: `ERROR: 获取数据失败，请刷新页面重试 ${err}`
                    });
                    this.geting = false;
                });
        },
        query(command) {
            this.clear();
            this.$store.commit('SET_STORE', {
                key: 'globalLoading',
                value: true
            });
            this.$axios
                .get(`https://unpkg.com/linux-command/command/${command}.md`)
                .then(e => {
                    this.commandData = e.data;
                    this.command = command;
                    this.$store.commit('SET_STORE', {
                        key: 'globalLoading',
                        value: false
                    });
                    this.$modal.show('readCommand');
                })
                .catch(err => {
                    this.$swal({
                        type: 'error',
                        title: '查询失败',
                        text: `ERROR: ${err}`
                    });
                    this.$store.commit('SET_STORE', {
                        key: 'globalLoading',
                        value: false
                    });
                });
        },
        clear() {
            this.command = '';
            this.commandData = '';
        }
    }
};
</script>

<style lang="scss">
.linux_command {
    .nya-subtitle {
        margin-top: 15px;
    }
    li {
        cursor: pointer;
        &:active,
        &:hover {
            text-decoration: underline;
        }
    }
    .readCommand_modal {
        padding: 15px;
        border-radius: 5px;
        background-color: var(--t2);
        max-width: 100%;
        .title {
            text-align: center;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #dad9d9;
        }
        .close-modal {
            text-align: center;
            padding-top: 15px;
            font-weight: bold;
            border-top: 1px solid #dad9d9;
            margin-top: 15px;
            font-size: 20px;
            cursor: pointer;
        }
    }
}
</style>
