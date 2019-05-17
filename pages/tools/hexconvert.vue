<template>
    <div class="hex_convert">
        <nya-container title="进制转换">
            <nya-input
                type="number"
                autocomplete="off"
                label="二进制"
                placeholder="请输入二进制"
                :value="bin"
                @input="convert($event,2)"
            />
            <br>
            <nya-input
                type="number"
                autocomplete="off"
                label="八进制"
                placeholder="请输入八进制"
                :value="oct"
                @input="convert($event,8)"
            />
            <br>
            <nya-input
                type="number"
                autocomplete="off"
                label="十进制"
                placeholder="请输入十进制"
                :value="dec"
                @input="convert($event,10)"
            />
            <br>
            <nya-input
                v-model="hex"
                type="text"
                autocomplete="off"
                label="十六进制"
                placeholder="请输入十六进制"
                :value="hex"
                @input="convert($event,16)"
            />
            <br>
            <nya-input
                type="text"
                autocomplete="off"
                label="三十二进制"
                placeholder="请输入三十二进制"
                :value="thir_bin"
                @input="convert($event,32)"
            />
            <br>
        </nya-container>

        <nya-container title="Explain">
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
<style lang="scss">
.hex_convert {
    .nya-input {
        width: 100%;
        margin-bottom: 15px;
    }
}
</style>
