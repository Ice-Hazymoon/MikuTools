<template>
    <div class="nya-radio">
        <label :for="id" class="name">
            {{ label }}
        </label>
        <input
            :id="id"
            ref="radio"
            v-bind="$attrs"
            :value="value"
            type="radio"
            :checked="model === value"
            @change="updateVal"
        >
        <label :for="id" class="radio"></label>
    </div>
</template>

<script>
export default {
    name: 'NyaRadio',
    inheritAttrs: false,
    model: {
        prop: 'model',
        event: 'change'
    },
    props: {
        value: {
            type: [String, Number],
            default: null,
            require: true
        },
        model: {
            type: [String, Number],
            default: null,
            require: true
        },
        label: {
            default: '',
            type: String
        }
    },
    data() {
        return {
            id: null
        };
    },
    mounted() {
        this.id = this.$shortid.generate();
    },
    methods: {
        updateVal() {
            this.$emit('change', this.value);
        }
    }
};
</script>

<style lang="scss">
.nya-radio {
    display: inline-flex;
    align-items: center;
    label.name {
        font-size: 16px;
        margin-right: 5px;
    }

    input[type='radio'] {
        display: none;
        &:checked + .radio {
            background-color: var(--theme);
            border: none;
        }
    }
    .radio {
        cursor: pointer;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        box-sizing: border-box;
        transition: border-color 0.2s ease;
        &:hover {
            border-color: var(--theme);
        }
    }
}
</style>
