<template>
    <div class="ssr_decode">
        <nya-container title="SS/SSR/V2ray 配置解析">
            <nya-input
                v-model.trim="configText"
                class="mb-15"
                label="请输入SSR/SS/V2ray 配置"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="results" title="解析成功">
            <pre>{{ results }}</pre>
        </nya-container>

        <nya-container title="说明">
            <ul class="nya-list">
                <li>所有解析均在本地进行，不会收集任何配置</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import formatUrl from '~/utils/formatUrl.js';
export default {
    name: 'SsrDecode',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            configText: '',
            requestIn: false
        };
    },
    computed: {
        results() {
            let rawConfigs = this.configText.split(' ');
            let configs = [];
            let decodedConfigs = [];
            for (const conf of rawConfigs) {
                if (conf !== '') configs.push(conf.replace(/#\w.*/, ''));
            }

            if (configs.length) {
                for (let rawConf of configs) {
                    let isSs = Boolean(rawConf.match(/^ssr?:\/\//));
                    let text = rawConf.replace(/(vmess|ssr?):\/\//, '');
                    let decode = Buffer.from(text, 'base64').toString();
                    if (isSs) {
                        let config = {};
                        let ssrConfig = decode.split(':');
                        if (rawConf.match(/^ssr:\/\//)) {
                            let formatConfig = formatUrl(ssrConfig[5]);
                            config['IP'] = ssrConfig[0];
                            config['端口'] = ssrConfig[1];
                            config['协议'] = ssrConfig[2];
                            config['加密'] = ssrConfig[3];
                            config['混淆'] = ssrConfig[4];
                            if (Object.keys(formatConfig).length)
                                config['密码'] = Buffer.from(
                                    ssrConfig[5].split('/')[0],
                                    'base64'
                                ).toString();
                            if (formatConfig.group)
                                config['分组'] = Buffer.from(
                                    formatConfig.group,
                                    'base64'
                                ).toString();
                            if (formatConfig.remarks)
                                config['备注'] = Buffer.from(
                                    formatConfig.remarks,
                                    'base64'
                                ).toString();
                            if (formatConfig.protoparam)
                                config['协议参数'] = Buffer.from(
                                    formatConfig.protoparam,
                                    'base64'
                                ).toString();
                            if (formatConfig.obfsparam)
                                config['混淆参数'] = Buffer.from(
                                    formatConfig.obfsparam,
                                    'base64'
                                ).toString();
                        } else {
                            config['加密'] = ssrConfig[0];
                            config['密码'] = ssrConfig[1].split('@')[0];
                            config['IP'] = ssrConfig[1].split('@')[1];
                            config['端口'] = ssrConfig[2];
                        }
                        decodedConfigs.push(config);
                    } else {
                        try {
                            decodedConfigs.push(JSON.parse(decode));
                        } catch (error) {
                            decodedConfigs.push('解析失败，请检查配置是否正确');
                        }
                    }
                }
                return decodedConfigs;
            } else {
                return false;
            }
        }
    }
};
</script>
