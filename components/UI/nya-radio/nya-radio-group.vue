<template>
    <div class="nya-radio-group" name="radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'NyaRadioGroup',
    inheritAttrs: false,
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: [String, Number],
            default: null,
            require: true
        }
    },
    methods: {
        updateVal(val) {
            this.$emit('change', val);
        }
    }
};
</script>
