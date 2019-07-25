<template>
    <div class="random">
        <nya-container title="随机数生成">
            <nya-input v-model.trim="min" fullwidth type="number" label="最小值" placeholder="0" autocomplete="off" />
            <nya-input v-model.trim="max" fullwidth type="number" label="最大值" placeholder="100" autocomplete="off" />
            <nya-input v-model.trim="num" fullwidth type="number" label="生成数量" placeholder="10" autocomplete="off" />
            <nya-checkbox v-model="repeat" label="是否重复" />
            <nya-checkbox v-model="br" label="使用换行分组" />
            <div class="nya-btn" @click="gen">
                生成随机数
            </div>
        </nya-container>

        <nya-container v-if="results.length" title="结果">
            <div v-html="results.join(br ? '<br>' : '\n')"></div>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'Random',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            min: 0,
            max: 100,
            num: 10,
            repeat: false,
            results: [],
            br: false
        };
    },
    methods: {
        gen() {
            this.results = [];
            const [max, min, num] = [
                parseInt(this.max),
                parseInt(this.min),
                parseInt(this.num)
            ];

            if (
                !/[0-9]+/.test(num) ||
                !/[0-9]+/.test(min) ||
                !/[0-9]+/.test(max)
            ) {
                this.$modal.show('dialog', {
                    title: '生成失败',
                    text: `ERROR: 请输入合法的数字`
                });
                return false;
            }

            if (max < min) {
                this.$modal.show('dialog', {
                    title: '生成失败',
                    text: `ERROR: 最大值不能小于最小值`
                });
                return false;
            }

            if (this.repeat) {
                const r = [];
                for (let index = 1; index <= num; index++) {
                    const random =
                        Math.round(Math.random() * (max - min)) + min;
                    r.push(random);
                }
                this.results = r;
            } else {
                if (
                    num >
                    Math.abs(max === 0 ? 1 : max) +
                        Math.abs(min === 0 ? 1 : min)
                ) {
                    this.$modal.show('dialog', {
                        title: '生成失败',
                        text: `ERROR: 不重复的生成数量不能超过最大值与最小值之间的绝对值`
                    });
                    return false;
                }
                for (let index = 1; index <= num; index++) {
                    this.doRand();
                }
            }
        },
        doRand() {
            const [max, min] = [parseInt(this.max), parseInt(this.min)];
            const random = Math.round(Math.random() * (max - min)) + min;
            if (this.results.indexOf(random) >= 0) this.doRand();
            else this.results.push(random);
        }
    }
};
</script>

<style lang="scss">
.random {
    .nya-input {
        margin-bottom: 15px;
    }
    .nya-checkbox {
        display: block;
        margin-bottom: 15px;
    }
}
</style>
