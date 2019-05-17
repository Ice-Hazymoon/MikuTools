<template>
    <div class="ssr_decode">
        <nya-container title="SSR配置解析">
            <nya-input
                v-model.trim="configText"
                label="请输入SSR/SS/V2ray 配置"
                autocomplete="off"
                autofocus
            />
        </nya-container>

        <nya-container v-if="results" title="解析成功">
            <pre>{{ results }}</pre>
        </nya-container>
        
        <nya-container title="Explain">
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
            if (this.configText) {
                let json;
                let isss = Boolean(this.configText.match(/^ssr?:\/\//));
                let text = this.configText.replace(/(vmess|ssr?):\/\//, '');
                let decode = Buffer.from(text, 'base64').toString();
                if (isss) {
                    let config = new Object();
                    let ssrconfig = decode.split(':');
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
        width: 100%;
        margin-bottom: 15px;
    }
}
</style>
