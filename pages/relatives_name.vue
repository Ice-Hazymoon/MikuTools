<template>
    <div class="relatives_name">
        <nya-container title="亲戚称谓&关系计算器">
            <nya-select v-model="type" class="mb-15" fullwidth :items="{'default': '算称谓', 'chain': '找关系'}" label="选择处理方式" />
            <nya-input v-show="type === 'default'" v-model="content" class="mb-15" fullwidth autofocus autocomplete="off" label="要找的称谓" placeholder="如：爸爸的儿子的女儿" />
            <nya-input v-show="!(type === 'default')" v-model="chain" class="mb-15" fullwidth autofocus autocomplete="off" label="要找的关系" placeholder="如：奶奶" />
            <div v-show="type === 'default'" class="btn-list">
                <div class="nya-subtitle">
                    点击添加关系
                </div>
                <button type="button" class="nya-btn" @click="data.push('爸爸')">
                    父
                </button>
                <button type="button" class="nya-btn" @click="data.push('妈妈')">
                    母
                </button>
                <button type="button" class="nya-btn" @click="data.push('老公')">
                    夫
                </button>
                <button type="button" class="nya-btn" @click="data.push('老婆')">
                    妻
                </button>
                <button type="button" class="nya-btn" @click="data.push('儿子')">
                    子
                </button>
                <button type="button" class="nya-btn" @click="data.push('女儿')">
                    女
                </button>
                <button type="button" class="nya-btn" @click="data.push('哥哥')">
                    兄
                </button>
                <button type="button" class="nya-btn" @click="data.push('弟弟')">
                    弟
                </button>
                <button type="button" class="nya-btn" @click="data.push('姐姐')">
                    姐
                </button>
                <button type="button" class="nya-btn" @click="data.push('妹妹')">
                    妹
                </button>
                <button type="button" class="nya-btn" @click="data.pop()">
                    <i class="eva eva-arrow-back-outline"></i>
                </button>
            </div>
            <nya-checkbox v-show="type === 'default'" v-model="reverse" class="mb-15" label="对方称呼我" />
            <br>
            <div v-show="type === 'default'">
                <nya-radio-group v-model="sex">
                    <nya-radio :value="0" label="我是女的" />
                    <nya-radio :value="1" label="我是男的" />
                </nya-radio-group>
            </div>
        </nya-container>

        <nya-container v-if="(type === 'default') ? data.length : chain" title="获取成功">
            <pre>{{ result }}</pre>
        </nya-container>
        
        <nya-container title="说明">
            <ul class="nya-list">
                <li>如果有多个结果说明有多个称谓</li>
                <li>
                    称谓歧义可到 <a href="https://github.com/mumuy/relationship" target="_blank" rel="noopener noreferrer">
                        relationship
                    </a> 进行反馈
                </li>
                <li>
                    算法来自 <a href="https://github.com/mumuy/relationship" target="_blank" rel="noopener noreferrer">
                        relationship
                    </a>
                </li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
import relationship from 'relationship.js';
export default {
    name: 'RelativesName',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            data: [],
            sex: 0, //自己的性别：0女性,1男性
            type: 'default', //转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
            reverse: false, //称呼方式：true对方称呼我,false我称呼对方
            chain: ''
        };
    },
    computed: {
        content: {
            set(val) {
                if (!val) {
                    this.data = [];
                    return false;
                }
                this.data = val.split('的');
            },
            get() {
                return this.data.join('的');
            }
        },
        result() {
            const result = relationship({
                text: this.type === 'default' ? this.content : this.chain,
                sex: this.sex,
                type: this.type,
                reverse: this.reverse
            });
            if (result.length) {
                return result.join('\n');
            } else {
                return '你们之间真的有关系吗？男的就叫姐姐，女的就叫阿姨吧~';
            }
        }
    }
};
</script>

<style lang="scss">
.relatives_name {
    .set {
        margin-bottom: 5px;
        .nya-checkbox {
            margin-right: 10px;
        }
    }
    .btn-list {
        font-size: 0;
        @media (max-width: 400px) {
            margin-bottom: 10px;
        }
    }
    .nya-btn {
        margin-right: 15px;
        margin-bottom: 15px;
        @media (max-width: 400px) {
            margin-right: 10px;
            margin-bottom: 10px;
        }
        @media (max-width: 350px) {
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
}
</style>
