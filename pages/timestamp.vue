<template>
    <div class="timestamp">
        <nya-container title="时间戳转换">
            <div v-if="chooseManually">
                <no-ssr>
                    <date-picker v-model="date" type="datetime" class="nya-input date-picker" format="YYYY-MM-DD hh:mm:ss" confirm :editable="false" placeholder="选择日期" :default-value="defaultValue" value-type="timestamp" />
                </no-ssr>
            </div>
            <div v-else>
                <div class="inputbtn">
                    <nya-input v-model.trim="current" fullwidth type="number" autofocus :label="`输入时间戳(${useSec ? '秒' : '毫秒'})`" :placeholder="`请输入时间戳(${useSec ? '秒' : '毫秒'})`" autocomplete="off" @keyup.enter="download" />
                    <button type="button" class="nya-btn" @click="setDate">
                        当前时间
                    </button>
                </div>
                <nya-checkbox v-model="useSec" label="使用秒(s)为单位" />
            </div>
            <nya-checkbox v-model="chooseManually" label="手动选择时间" />
        </nya-container>

        <nya-container v-show="results" title="结果">
            <pre>{{ results }}</pre>
        </nya-container>
    </div>
</template>

<script>
let DatePicker;
if (process.browser) {
    DatePicker = require('vue2-datepicker').default;
}
import dayjs from 'dayjs';
export default {
    name: 'Timestamp',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        DatePicker
    },
    data() {
        return {
            current: null,
            useSec: false,
            defaultValue: dayjs().format('YYYY-MM-DD'),
            date: null,
            chooseManually: false
        };
    },
    computed: {
        results() {
            if (!this.current) return false;
            const time = this.chooseManually
                ? this.date
                : parseInt(this.current);
            if (this.chooseManually) {
                return this.date;
            } else {
                if (this.useSec) {
                    return dayjs.unix(time).format('YYYY-MM-DD hh:mm:ss');
                } else {
                    return dayjs(time).format('YYYY-MM-DD hh:mm:ss');
                }
            }
        }
    },
    methods: {
        setDate() {
            if (this.useSec) {
                this.current = dayjs().unix();
            } else {
                this.current = new Date().getTime();
            }
        }
    }
};
</script>

<style lang="scss">
.timestamp {
    .nya-checkbox {
        margin-top: 15px;
    }
    .date-picker {
        width: 100%;
    }
    .date-picker {
        margin-top: 15px;
    }
    .nya-input {
        width: 100%;
        box-sizing: border-box;
        .mx-input {
            border-radius: 0;
            height: 100%;
            box-sizing: border-box;
        }
    }
}
</style>
