<template>
    <div class="sot1_encrypt">
        <nya-container title="盲人摸象加解密">
            <nya-input
                v-model.trim="value"
                label="请输入待加解密字符"
                placeholder="这是一个例子 / ⣨⢿⢙⣦⢘⢯⣤⢸⢀⣤⢸⢪⣤⢾⢋⣩⣦⣥⢭⢐"
                autocomplete="off"
                autofocus
                fullwidth
                rows="5"
                type="textarea"
            />
            <nya-input v-model.trim="passwd" class="mt-15" label="密码" fullwidth type="password" placeholder="建议密码不少于4个字符" autocomplete="off" />
            <nya-checkbox v-model="type" class="mt-15" label="解码" />
        </nya-container>

        <nya-container v-show="result" title="转换结果">
            <pre>{{ result }}</pre>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>该转码输出字符与其他普遍方法并不一致</li>
                <li>加密后数据体积约为原数据三倍大小，拉丁字母系显示空间约和原数据一致</li>
                <li><b>Sot1 v1 版本使用加密方式可能有点粗糙，请误加密重要数据</b></li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import sot1_encrypt from '~/utils/sot1_encrypt.js';
export default {
    name: 'Sot1Encrypt',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            value: '',
            passwd: '',
            type: false // true:encode false: decode
        };
    },
    computed: {
        result() {
            return this.type
                ? sot1_encrypt.decode(this.value, this.passwd)
                : sot1_encrypt.encode(this.value, this.passwd);
        }
    },
    methods: {}
};
</script>
