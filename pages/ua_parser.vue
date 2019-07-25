<template>
    <div class="ua_parser">
        <nya-container title="UserAgent 解析">
            <nya-input
                v-model.trim="ua"
                label="请输入一个UA开始解析"
                placeholder="Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.75 Safari/537.1"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="results.ua" title="解析结果">
            <pre v-if="results.ua">{{ results.ua }}</pre>
            <p v-if="results.browser.name">
                浏览器：{{ `${results.browser.name} ${results.browser.version}` }}
            </p>
            <p v-if="results.device.type">
                设备：{{ `${results.device.type} / ${results.device.vendor} / ${results.device.model}` }}
            </p>
            <p v-if="results.os.name">
                操作系统：{{ `${results.os.name} / ${results.os.version}` }}
            </p>
            <p v-if="results.engine.name">
                内核：{{ `${results.engine.name} / ${results.engine.version}` }}
            </p>
            <p v-if="results.cpu.architecture">
                架构：{{ results.cpu.architecture }}
            </p>
        </nya-container>
    </div>
</template>

<script>
import UAParser from 'ua-parser-js';
export default {
    name: 'UaParser',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            ua: ''
        };
    },
    computed: {
        results() {
            let parser = new UAParser();
            parser.setUA(this.ua);
            return parser.getResult();
        }
    },
    mounted() {
        if (process.browser) {
            this.ua = navigator.userAgent;
        }
    }
};
</script>
