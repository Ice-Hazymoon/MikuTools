<template>
    <div class="ssr_decode">
        <nya-container title="SS/SSR/V2ray 配置解析">
            <nya-input
                v-model.trim="configText"
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
            let decodeConfig = this.configText.replace(/#(\w|%)+/, '');
            if (decodeConfig) {
                let json;
                let isss = Boolean(decodeConfig.match(/^ssr?:\/\//));
                let text = decodeConfig.replace(/(vmess|ssr?):\/\//, '');
                let decode = Buffer.from(text, 'base64').toString();
                if (isss) {
                    let config = new Object();
                    let ssrconfig = decode.split(':');
                    if (decodeConfig.match(/^ssr:\/\//)) {
                        let formatConfig = formatUrl(ssrconfig[5]);
                        config['IP'] = ssrconfig[0];
                        config['端口'] = ssrconfig[1];
                        config['协议'] = ssrconfig[2];
                        config['加密'] = ssrconfig[3];
                        config['混淆'] = ssrconfig[4];
                        if (Object.keys(formatConfig).length)
                            config['密码'] = Buffer.from(
                                ssrconfig[5].split('/')[0],
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
                        config['加密'] = ssrconfig[0];
                        config['密码'] = ssrconfig[1].split('@')[0];
                        config['IP'] = ssrconfig[1].split('@')[1];
                        config['端口'] = ssrconfig[2];
                    }
                    return config;
                } else {
                    try {
                        json = JSON.parse(decode);
                    } catch (error) {
                        return '解析失败，请检查配置是否正确';
                    }
                    return json;
                }
            } else {
                return false;
            }
        }
    }
};
</script>

<style lang="scss">
.ssr_decode {
    .nya-input {
        margin-bottom: 15px;
    }
}
</style>
