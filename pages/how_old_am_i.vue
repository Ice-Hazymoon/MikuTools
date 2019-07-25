<template>
    <div class="how_old_am_i">
        <nya-container title="我几岁了?">
            <date-picker
                v-model="date"
                class="nya-input"
                :editable="false"
                placeholder="选择你的公历生日"
                value-type="format"
                :not-before="from"
                :not-after="to"
                :default-value="defaultValue"
            />
        </nya-container>
        <nya-container v-show="date" :title="'你 '+ fullAge +' 岁了'">
            <table class="nya-table result">
                <tr>
                    <th>公历出生日期</th>
                    <td colspan="2">
                        {{ gregorian }}
                    </td>
                </tr>
                <tr>
                    <th>农历出生日期</th>
                    <td colspan="2">
                        {{ lunar }}
                    </td>
                </tr>
                <tr>
                    <th>周岁</th>
                    <td>{{ fullAge }} 岁</td>
                    <td class="notic">
                        算法：每过一个公历生日就长一岁
                    </td>
                </tr>
                <tr>
                    <th>虚岁</th>
                    <td>{{ age }} 岁</td>
                    <td class="notic">
                        算法：一出生就是一岁，每过一个春节就长一岁
                    </td>
                </tr>
                <tr>
                    <th>生活天数</th>
                    <td colspan="2">
                        你已经苟活了 {{ dayOfLife }} 天
                    </td>
                </tr>
                <tr>
                    <th>距离下次公历生日</th>
                    <td colspan="2">
                        {{ nextGregorian }}
                    </td>
                </tr>
                <tr>
                    <th>距离下次农历生日</th>
                    <td colspan="2">
                        {{ nextLunar }}
                    </td>
                </tr>
            </table>
        </nya-container>
    </div>
</template>

<script>
let DatePicker;
if (process.browser) {
    DatePicker = require('vue2-datepicker').default;
}
import dayjs from 'dayjs';
import chineseLunar from '@/utils/chinese-lunar.js';
const dayCN = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
];
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
                .subtract(79, 'year')
                .toDate(),
            to: dayjs()
                .subtract(1, 'year')
                .toDate()
        };
    },
    computed: {
        // 农历
        lunar() {
            if (this.date) {
                const lunar = chineseLunar.solarToLunar(
                    dayjs(this.date).toDate()
                );
                return chineseLunar.format(lunar, 'Y M d (T) A');
            }
            return '';
        },
        // 公历
        gregorian() {
            return dayjs(this.date).format('YYYY 年 MM 月 DD 日');
        },
        // 虚岁 ++
        age() {
            const birth = dayjs(new Date(this.date));
            return dayjs().year() - (birth.year() - 1);
        },
        // 周岁 --
        fullAge() {
            const birth = dayjs(new Date(this.date));
            if (dayjs().month() < birth.month()) {
                return dayjs().year() - birth.year() - 1;
            } else if (dayjs().month() == birth.month()) {
                if (dayjs().date() < birth.date()) {
                    return dayjs().year() - birth.year() - 1;
                } else {
                    return dayjs().year() - birth.year();
                }
            } else {
                return dayjs().year() - birth.year();
            }
        },
        dayOfLife() {
            return dayjs().diff(dayjs(new Date(this.date)), 'day');
        },
        nextLunar() {
            if (this.date) {
                let lunar = chineseLunar.solarToLunar(
                    dayjs(this.date).toDate()
                );
                lunar.year = dayjs().year();
                // 减一天不然算不对。
                const nowlunar = chineseLunar.solarToLunar(
                    dayjs()
                        .subtract(1, 'day')
                        .toDate()
                );
                const diff = chineseLunar.dateDiff(nowlunar, lunar, 'd');
                let day = dayCN[chineseLunar.lunarToSolar(lunar).getDay()];
                if (diff > 0) {
                    return `还有 ${diff} 天，那天是${day}`;
                } else if (diff < 0) {
                    return `还有 1 年 ${Math.abs(diff)} 天，那天是${day}`;
                } else {
                    return '就是今天!';
                }
            }
            return '';
        },
        nextGregorian() {
            if (this.date) {
                let gregorian = dayjs(new Date(this.date));
                gregorian = gregorian.year(dayjs().year());
                const diff = gregorian.diff(dayjs(), 'day');
                let day = dayCN[gregorian.get('day')];
                if (diff > 0) {
                    return `还有 ${diff} 天，那天是${day}`;
                } else if (diff < 0) {
                    gregorian = gregorian.year(new Date().getFullYear() + 1);
                    day = dayCN[gregorian.get('day')];
                    return `还有 1 年 ${Math.abs(diff)} 天，那天是${day}`;
                } else {
                    return '就是今天!';
                }
            } else {
                return '';
            }
        }
    }
};
</script>

<style lang='scss'>
.how_old_am_i {
    .nya-input {
        width: 100%;
        box-sizing: border-box;
        .mx-input {
            border-radius: 0;
            height: 100%;
            box-sizing: border-box;
        }
    }
    .result {
        table-layout: auto;
        width: 100%;
        .notic {
            color: rgba(0, 0, 0, 0.5);
        }
        th,
        td {
            text-align: center;
        }
    }
}
</style>
