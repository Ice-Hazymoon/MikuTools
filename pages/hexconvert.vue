<template>
    <div class="hex_convert">
        <nya-container title="进制转换">
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="二进制"
                placeholder="请输入二进制"
                :value="bin"
                fullwidth
                @input="convert($event,2)"
            />
            <br>
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="八进制"
                placeholder="请输入八进制"
                :value="oct"
                fullwidth
                @input="convert($event,8)"
            />
            <br>
            <nya-input
                class="mb-15"
                type="number"
                autocomplete="off"
                label="十进制"
                placeholder="请输入十进制"
                :value="dec"
                fullwidth
                @input="convert($event,10)"
            />
            <br>
            <nya-input
                v-model="hex"
                class="mb-15"
                type="text"
                autocomplete="off"
                label="十六进制"
                placeholder="请输入十六进制"
                :value="hex"
                fullwidth
                @input="convert($event,16)"
            />
            <br>
            <nya-input
                class="mb-15"
                type="text"
                autocomplete="off"
                label="三十二进制"
                placeholder="请输入三十二进制"
                :value="thir_bin"
                fullwidth
                @input="convert($event,32)"
            />
            <br>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>请规范的输入相应进制，否则将无法正确计算</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'HexConvert',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            bin: '',
            oct: '',
            dec: '',
            hex: '',
            thir_bin: ''
        };
    },
    methods: {
        convert(number, bin) {
            // null
            if (number.length < 1) {
                this.clear();
                return;
            }

            // num2dec
            let dec = parseInt(number, Number(bin));
            if (isNaN(dec)) {
                this.clear();
                return;
            }

            this.bin = dec.toString(2);
            this.oct = dec.toString(8);
            this.dec = dec;
            this.hex = dec.toString(16);
            this.thir_bin = dec.toString(32);
        },
        clear() {
            this.bin = '';
            this.oct = '';
            this.dec = '';
            this.hex = '';
            this.thir_bin = '';
        }
    }
};
</script>
