<template>
    <div class="nya-select" :class="{ 'fullwidth': fullwidth }">
        <label v-if="label" :for="id">
            {{ label }}
        </label>
        <div class="select">
            <select :id="id" v-bind="$attrs" @input="$emit('input', $event.target.value)" @change="$emit('change')">
                <option v-for="(item, index) in items" :key="index" :value="index">
                    {{ item }}
                </option>
            </select>
            <i class="eva eva-arrow-ios-downward-outline"></i>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        items: {
            default: () => {
                return [];
            },
            type: [Array, Object]
        },
        label: {
            default: '',
            type: String
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
        this.id = this.$shortid.generate();
    }
};
</script>


<style lang="scss">
.nya-select {
    position: relative;
    display: inline-table;
    &.fullwidth {
        width: 100%;
    }

    label {
        display: block;
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .title {
        display: block;
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .select {
        position: relative;
    }

    select {
        appearance: none;
        width: 100%;
        padding: 10px 15px;
        cursor: pointer;
        outline: none;
        border: 1px solid var(--border-color);
        color: var(--t1);
        background: transparent;
        transition: border-color 0.2s ease;
        &:focus {
            border-color: var(--theme);
        }
    }

    i {
        z-index: 1;
        line-height: 18px;
        pointer-events: none;
        position: absolute;
        right: 4px;
        bottom: 4px;
        display: flex;
        align-items: center;
        padding-right: 7px;
        font-size: 25px;
        height: calc(100% - 8px);
        box-sizing: border-box;
    }
}
</style>
