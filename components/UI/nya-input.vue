<template>
    <div class="nya-input" :class="{ 'fullwidth': fullwidth }">
        <Dynamic v-if="label" class="input-title" tag="label" :for="id" :template="label" />
        <div v-if="type === 'file'" class="input-file">
            <input
                :id="id"
                ref="input"
                type="file"
                v-bind="$attrs"
                :value="value"
                @change="$emit('change', $event)"
                @input="$emit('input', $event.target.value, $event)"
                @keyup="$emit('keyup', $event)"
            >
            <label :for="id">
                <span v-if="!value">{{ placeholder }}</span>
                <span v-else class="filename">{{ handleFileName(value) }}</span>
            </label>
        </div>
        <textarea
            v-else-if="type === 'textarea'"
            :id="id"
            ref="input"
            v-bind="$attrs"
            :value="value"
            :placeholder="placeholder"
            :class="{'nya-hide-scroll' : autoheight}"
            @change="$emit('change', $event)"
            @input="textareaEvent"
            @keyup="$emit('keyup', $event)"
        ></textarea>
        <input
            v-else
            :id="id"
            ref="input"
            :type="type"
            v-bind="$attrs"
            :value="value"
            :placeholder="placeholder"
            @change="$emit('change', $event)"
            @input="$emit('input', $event.target.value, $event)"
            @keyup="$emit('keyup', $event)"
        >
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';

export default {
    name: 'NyaInput',
    components: {
        Dynamic
    },
    inheritAttrs: false,
    props: {
        autofocus: {
            default: false,
            type: Boolean
        },
        type: {
            default: 'text',
            type: String
        },
        placeholder: {
            default: '',
            type: String
        },
        label: {
            default: '',
            type: String
        },
        value: {
            default: null,
            type: [String, Number]
        },
        autoheight: {
            default: false,
            type: Boolean
        },
        fullwidth: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            id: null
        };
    },
    mounted() {
        if (this.autoheight) {
            this.handleAutoHeight();
        }
        this.id = this.$shortid.generate();
        if (this.autofocus) {
            this.$nextTick().then(() => {
                this.$refs.input.focus();
            });
        }
    },
    methods: {
        textareaEvent($event) {
            this.$emit('input', $event.target.value);
            if (this.autoheight) {
                this.handleAutoHeight();
            }
        },
        handleAutoHeight() {
            this.$nextTick(() => {
                let el = this.$refs.input;
                el.style.height = 'auto';
                el.style.height = el.scrollHeight + 'px';
            });
        },
        handleFileName(value) {
            return value.replace(/C:\\fakepath\\/, '');
        }
    }
};
</script>

<style lang="scss">
.nya-input {
    display: inline-block;
    &.fullwidth {
        width: 100%;
    }

    .input-title {
        display: block;
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    input,
    textarea,
    .input-file {
        width: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid var(--border-color);
        background-color: transparent;
        color: var(--t1);
        outline: none;
        transition: border-color 0.2s ease;
        &[disabled='disabled'] {
            opacity: 0.8;
            cursor: no-drop;
        }
        &::placeholder {
            color: rgb(158, 158, 158);
        }
        &:focus {
            border-color: var(--theme);
        }
    }

    .input-file {
        label {
            cursor: pointer;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            margin-bottom: 0;
            span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        input {
            display: none;
        }
    }
}
</style>
