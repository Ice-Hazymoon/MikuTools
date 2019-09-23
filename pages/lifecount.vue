<template>
    <div class="lifecount">
        <nya-container title="人生小格">
            <client-only>
                <date-picker v-model="date" class="nya-input" :editable="false" placeholder="选择你的生日" :default-value="defaultValue" value-type="format" :not-before="from" :not-after="to" />
            </client-only>
        </nya-container>

        <nya-container v-if="dateData" title="已经过去了">
            <div class="card">
                <div class="list">
                    <div class="name">
                        {{ dateData.past.year }}<small>年</small>
                    </div>
                    <div class="date">
                        {{ dateData.past.hour }}<small>时</small>
                    </div>
                </div>
                <div class="list">
                    <div class="name">
                        {{ dateData.past.month }}<small>月</small>
                    </div>
                    <div class="date">
                        {{ dateData.past.minute }}<small>分</small>
                    </div>
                </div>
                <div class="list">
                    <div class="name">
                        {{ dateData.past.day }}<small>天</small>
                    </div>
                    <div class="date">
                        {{ dateData.past.second }}<small>秒</small>
                    </div>
                </div>
            </div>
        </nya-container>

        <nya-container v-if="dateData" title="剩下的时间">
            <div class="card">
                <div class="list">
                    <div class="name">
                        {{ dateData.have.year }}<small>年</small>
                    </div>
                    <div class="date">
                        {{ dateData.have.hour }}<small>时</small>
                    </div>
                </div>
                <div class="list">
                    <div class="name">
                        {{ dateData.have.month }}<small>月</small>
                    </div>
                    <div class="date">
                        {{ dateData.have.minute }}<small>分</small>
                    </div>
                </div>
                <div class="list">
                    <div class="name">
                        {{ dateData.have.day }}<small>天</small>
                    </div>
                    <div class="date">
                        {{ dateData.have.second }}<small>秒</small>
                    </div>
                </div>
            </div>
        </nya-container>

        <nya-container v-if="results" title="你的人生进度">
            <div class="box">
                <div v-for="(item, index) in results.blockArr" :key="index" class="block" :class="[item.type, { 'retired': index === 323 && index >= results.length.past }, { 'flash': index === (results.length.past - 1) }]"></div>
            </div>
        </nya-container>

        <nya-container v-if="results" title="分享链接">
            <nya-copy :copy="share + '\n这是我的人生进度，你也快来查询一下吧~'">
                <div v-text="share"></div>
            </nya-copy>
        </nya-container>

        <nya-container title="说明">
            <li><small>参考了小程序<b> lifecount </b>而制作的网页版本</small></li>
            <li><b>假设我们的寿命是80岁,分为400个方块。</b></li>
            <div class="hint">
                <li><div class="block past"></div> 你已经走过的生命</li>
                <li><div class="block sleep"></div> 如果你平均每天休息 8 小时，这是你余下生命里睡眠占用的时间</li>
                <li><div class="block work"></div> 如果你 65 岁退休，退休前平均每天工作 8 小时，这是你余下生命里工作占用的时间</li>
                <li><div class="block retired"></div> 65 岁，你退休了</li>
                <li><div class="block child"></div> 如果你 28 岁生孩子，孩子18岁出门上大学，这 18 年里你平均每天能花 5 个小时陪伴孩子，这里是你余下生命里所用去的时间</li>
                <li><div class="block parents"></div> 如果你每个月能看望父母一天，在他们 80 岁前，这是你的余生里还能陪伴他们的时光</li>
                <li><div class="block surplus"></div> 除了以上之外，你剩下的所有日子</li>
            </div>
            <li>数据仅供娱乐，人生苦短，继续努力吧~</li>
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
    name: 'Lifecount',
    components: {
        DatePicker
    },
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            date: '',
            defaultValue: dayjs()
                .subtract(18, 'year')
                .format('YYYY-MM-DD'),
            from: dayjs()
                .subtract(78, 'year')
                .toDate(),
            to: dayjs()
                .subtract(1, 'year')
                .toDate(),
            updateDate: null,
            dateData: false
        };
    },
    computed: {
        results() {
            if (!this.date.trim()) return false;
            const blockArr = [];
            const date = dayjs(this.date);
            const thisDay = dayjs();

            const oneBlockHour = 24 * 72; // 一个方块代表的小时
            const haveChildren = 28; // 生孩子的年龄

            const pastDate = thisDay.diff(date, 'day'); // 已经过去的时间(天)

            const deathDate = date.add(80, 'year'); // 80岁的时候
            const fromDeathDate = deathDate.diff(thisDay, 'day'); // 距离80岁还能活的时间(天)

            const retiredDate = date.add(65, 'year'); // 65岁退休的时候
            const fromRetiredDate = retiredDate.diff(thisDay, 'day'); // 距离65岁还能活的时间(天)

            const childrenDate = date.add(18 + haveChildren, 'year'); // 如果28岁生孩子，孩子18岁的时候
            const fromChildrenDate = childrenDate.diff(thisDay, 'day'); // 距离孩子18岁还能活的时间(天)

            const parentsDate = date.add(80 - haveChildren, 'year'); // 距离父母死亡
            const fromParentsDate = parentsDate.diff(thisDay, 'day'); // 距离父母死亡还能活的时间(天)

            const past = ~~(pastDate / 72); // 已经过去的方块

            const sleep = ~~((8 * fromDeathDate) / oneBlockHour); // 碎觉所需的方块
            const work =
                fromRetiredDate <= 0
                    ? 0
                    : ~~((8 * fromRetiredDate) / oneBlockHour); // 工作所需的方块
            const child =
                fromChildrenDate <= 0
                    ? 0
                    : ~~((5 * fromChildrenDate) / oneBlockHour); // 陪伴孩子
            const parents =
                fromParentsDate <= 0
                    ? 0
                    : ~~(((fromParentsDate / 31) * 24) / oneBlockHour); // 陪伴父母
            let surplus = 400 - (sleep + past + work + child + parents);
            if (surplus <= 0) surplus = 0;

            const data = {
                past,
                sleep,
                work,
                child,
                parents,
                surplus
            };
            Object.keys(data).forEach(e => {
                for (let i = 0; i < data[e]; i++) {
                    blockArr.push({
                        type: e
                    });
                }
            });
            return {
                blockArr,
                length: data
            };
        },
        share() {
            return `${process.env.url}${this.$route.path}?k=${Buffer.from(
                this.date
            ).toString('base64')}`;
        }
    },
    watch: {
        date(val) {
            if (!val) {
                clearInterval(this.updateDate);
                this.dateData = false;
                return false;
            }
            this.setDateData();
            this.updateDate = setInterval(this.setDateData, 1000);
        }
    },
    mounted() {
        if (this.$route.query.k) {
            try {
                let date = Buffer.from(
                    this.$route.query.k,
                    'base64'
                ).toString();
                this.date = date;
            } catch (error) {
                ('aaa');
            }
        }
    },
    methods: {
        setDateData() {
            const date = dayjs(this.date);
            const thisDay = dayjs();
            const deathDate = date.add(80, 'year'); // 80岁的时候
            this.dateData = {
                past: {
                    year: thisDay.diff(date, 'year', true).toFixed(1),
                    month: thisDay.diff(date, 'month', true).toFixed(1),
                    day: thisDay.diff(date, 'day', true).toFixed(1),
                    hour: thisDay.diff(date, 'hour', true).toFixed(1),
                    minute: thisDay.diff(date, 'minute', true).toFixed(1),
                    second: thisDay.diff(date, 'second', true).toFixed(1)
                },
                have: {
                    year: deathDate.diff(thisDay, 'year', true).toFixed(1),
                    month: deathDate.diff(thisDay, 'month', true).toFixed(1),
                    day: deathDate.diff(thisDay, 'day', true).toFixed(1),
                    hour: deathDate.diff(thisDay, 'hour', true).toFixed(1),
                    minute: deathDate.diff(thisDay, 'minute', true).toFixed(1),
                    second: deathDate.diff(thisDay, 'second', true).toFixed(1)
                }
            };
        }
    }
};
</script>

<style lang="scss">
@keyframes flash {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.lifecount {
    .card {
        width: 100%;
        display: flex;
        justify-content: space-around;
        font-size: 25px;
        text-align: center;
        margin-bottom: 20px;
        .name {
            margin-bottom: 10px;
        }
        small {
            font-size: 16px;
            color: #999999;
            margin-left: 5px;
        }
        @media (max-width: 450px) {
            font-size: 20px;
        }
    }

    .hint {
        margin: 17px 0;
    }
    li {
        margin: 8px 0;
        list-style: none;
        line-height: 1.5;
        .block {
            margin: 0;
            width: 15px !important;
            height: 15px !important;
            margin-right: 5px;
        }
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
    .box {
        font-size: 0;
        width: 500px;
        height: 500px;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
        @media (max-width: 610px) {
            height: 400px;
            width: 400px;
        }
        @media (max-width: 360px) {
            height: 350px;
            width: 350px;
        }
        .flash {
            animation: flash ease 2s infinite;
            background-color: #4fa38c;
        }
    }
    .block {
        display: inline-block;
        width: calc(100% / 20 - 6px);
        height: calc(100% / 20 - 6px);
        margin: 3px;
        &.past {
            background-color: #98c3b9;
        }
        &.sleep {
            background-color: #c1e8f9;
        }
        &.work {
            background-color: #ab9f93;
        }
        &.child {
            background-color: #e3a6ab;
        }
        &.parents {
            background-color: #7ea1b7;
        }
        &.surplus {
            background-color: #e2e2e2;
        }
        &.retired {
            background-color: #f8c039;
        }
    }
}
</style>
