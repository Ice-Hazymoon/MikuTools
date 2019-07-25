<template>
    <div class="cidr">
        <nya-container title="CIDR计算">
            <nya-input
                v-model="CIDRValue"
                label="输入CIDR地址(IPv4)"
                placeholder="例如:172.18.0.1/16"
                autocomplete="off"
                autofocus
                fullwidth
                @input="handleCIDRValue"
            />
            <span v-if="isWarn" class="warn">当前地址不合法</span>
        </nya-container>

        <nya-container v-show="addrNum" title="结果">
            <p>
                <b>可用地址：</b><span>{{ addrNum }}</span>
            </p>
            <p>
                <b>子网掩码：</b><span>{{ subnetMask }}</span>
            </p>
            <p>
                <b>网络ID：</b><span>{{ netID }}</span>
            </p>
            <p>
                <b>起始IP地址：</b><span>{{ startIPaddr }}</span>
            </p>
            <p>
                <b>结束IP地址：</b><span>{{ endIPaddr }}</span>
            </p>
            <p>
                <b>广播地址：</b><span>{{ Broaddr }}</span>
            </p>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'Cidr',
    data() {
        return {
            CIDRValue: '',
            addrNum: 0,
            subnetMask: '',
            netID: '',
            startIPaddr: '',
            endIPaddr: '',
            Broaddr: '',
            isWarn: false
        };
    },
    methods: {
        handleCIDRValue(val) {
            // replace 并没有什么软用,只是为了方便用到他的一部分特性
            let warnStat = true;
            val.replace(
                /(^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$)/,
                (...args) => {
                    // 效验值
                    // IP 0 - 255
                    // 网络ID位数 0 - 32
                    if (
                        Number(args[2]) > 255 ||
                        Number(args[2]) < 0 ||
                        Number(args[3]) > 255 ||
                        Number(args[3]) < 0 ||
                        Number(args[4]) > 255 ||
                        Number(args[4]) < 0 ||
                        Number(args[5]) > 255 ||
                        Number(args[5]) < 0 ||
                        Number(args[6]) > 32 ||
                        Number(args[6]) < 1
                    ) {
                        return args[1];
                    }

                    /**
                     * CIDR 解析
                     *  */
                    // 验证通过
                    warnStat = false;

                    // 子网掩码二进制
                    let subnetMaskBin = '1'
                        .repeat(Number(args[6]))
                        .padEnd(32, '0');

                    // 获取子网掩码
                    let subnetMaskArr = [];
                    for (let i = 0; i < 4; i++) {
                        subnetMaskArr.push(
                            parseInt(subnetMaskBin.substr(i * 8, 8), 2)
                        );
                    }
                    this.subnetMask = subnetMaskArr.join('.');

                    // 获取网络ID 广播地址 可用地址
                    let netIDArr = [];
                    let BroaddrArr = [];
                    let addrNum = 0;
                    subnetMaskArr.forEach((val, key) => {
                        // 网络ID
                        netIDArr.push(Number(args[key + 2]) & val);
                        // 广播地址
                        BroaddrArr.push(Number(args[key + 2]) | (255 ^ val));
                        // 可用地址
                        addrNum +=
                            (BroaddrArr[key] - netIDArr[key]) *
                            Math.pow(256, 3 - key);
                    });
                    this.netID = netIDArr.join('.');
                    this.Broaddr = BroaddrArr.join('.');
                    this.addrNum = Math.abs(addrNum - 1);

                    // 获取起始IP地址
                    netIDArr[3] = netIDArr[3] + 1;
                    this.startIPaddr = netIDArr.join('.');

                    // 获取结束IP地址
                    BroaddrArr[3] = BroaddrArr[3] - 1;
                    this.endIPaddr = BroaddrArr.join('.');

                    return args[1];
                }
            );

            // 提示警告
            this.isWarn = warnStat;
            return;
        }
    }
};
</script>

<style lang="scss">
.cidr {
    .nya-input {
        margin-bottom: 15px;
    }

    .warn {
        color: rgba(230, 193, 29, 0.794);
    }
}
</style>
