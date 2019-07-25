<template>
    <div class="crontab">
        <nya-container title="执行Cron表达式">
            <nya-input
                v-model.trim="content"
                label="输入表达式"
                placeholder="0 */12 * * * *"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="results.length" title="接下来7次的执行时间">
            <p v-for="(item, index) in results" :key="index">
                {{ formatDate(item) }}
            </p>
        </nya-container>

        <nya-container title="Cron 表达式参考">
            <pre><code>Crontab
*    *    *    *    *    *
-    -    -    -    -    -
|    |    |    |    |    |
|    |    |    |    |    + year [optional]
|    |    |    |    +----- day of week (0 - 7) (Sunday=0 or 7)
|    |    |    +---------- month (1 - 12)
|    |    +--------------- day of month (1 - 31)
|    +-------------------- hour (0 - 23)
+------------------------- min (0 - 59)
</code></pre>
        </nya-container>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import later from '~/utils/later.js';
export default {
    name: 'Crontab',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            content: ''
        };
    },
    computed: {
        results() {
            const regex = /^(\*|((\*\/)?[1-5]?[0-9])) (\*|((\*\/)?[1-5]?[0-9])) (\*|((\*\/)?(1?[0-9]|2[0-3]))) (\*|((\*\/)?([1-9]|[12][0-9]|3[0-1]))) (\*|((\*\/)?([1-9]|1[0-2]))) (\*|((\*\/)?[0-6]))$/;
            if (regex.test(this.content)) {
                let sched = later.parse.cron(this.content);
                later.date.localTime();
                let results = later.schedule(sched).next(7);
                return results;
            } else {
                return [];
            }
        }
    },
    methods: {
        formatDate(date) {
            return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
        }
    }
};
</script>
