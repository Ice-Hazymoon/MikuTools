<template>
    <div class="temperature_conversion">
        <nya-container title="温度单位转换">
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="摄氏度"
                placeholder="请输入摄氏度"
                :value="valC"
                fullwidth
                @input="convert($event,'C')"
            />
            <br>
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="华氏度"
                placeholder="请输入华氏度"
                :value="valF"
                fullwidth
                @input="convert($event,'F')"
            />
            <br>
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="开氏度"
                placeholder="请输入开氏度"
                :value="valK"
                fullwidth
                @input="convert($event,'K')"
            />
            <br>
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="兰氏度"
                placeholder="请输入兰氏度"
                :value="valRa"
                fullwidth
                @input="convert($event,'Ra')"
            />
            <br>
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="列氏度"
                placeholder="请输入列氏度"
                :value="valRe"
                fullwidth
                @input="convert($event,'Re')"
            />
            <br>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'TemperatureConversion',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            valC: '',
            valF: '',
            valK: '',
            valRa: '',
            valRe: ''
        };
    },
    methods: {
        convert(number, type) {
            // null
            if (number.length < 1) {
                this.clear();
                return;
            }
            let cels = 0;
            number = Number(number);
            switch (type) {
                case 'C':
                    cels = number;
                    break;
                case 'F':
                    cels = (number - 32) / 1.8;
                    break;
                case 'K':
                    cels = number - 273.15;
                    break;
                case 'Ra':
                    cels = (number - 32 - 459.67) / 1.8;
                    break;
                case 'Re':
                    cels = number * 1.25;
                    break;
            }
            const toFixed = (i, val) =>
                type === i ? number : parseFloat(val.toFixed(2));

            cels = Number(cels);
            this.valC = toFixed('C', cels);
            this.valF = toFixed('F', cels * 1.8 + 32);
            this.valK = toFixed('K', cels + 273.15);
            this.valRa = toFixed('Ra', cels * 1.8 + 32 + 459.67);
            this.valRe = toFixed('Re', cels * 0.8);
        },
        clear() {
            this.valC = '';
            this.valF = '';
            this.valK = '';
            this.valRa = '';
            this.valRe = '';
        }
    }
};
</script>
