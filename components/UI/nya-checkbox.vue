<template>
    <div class="nya-checkbox inline">
        <label :for="id" class="name">
            {{ label }}
        </label>
        <input
            :id="id"
            v-bind="$attrs"
            type="checkbox"
            :checked="checked"
            @change="$emit('change', $event.target.checked)"
        >
        <label :for="id" class="icon">
            <i v-if="icon" :class="`eva eva-${icon}`"></i>
        </label>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        inline: {
            default: false,
            type: Boolean
        },
        checked: {
            default: false,
            type: Boolean,
            required: true
        },
        label: {
            default: '',
            type: String
        },
        icon: {
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
    }
};
</script>

<style lang="scss">
.nya-checkbox {
    display: inline-flex;
    align-items: center;
    label.name {
        font-size: 18px;
        margin-right: 5px;
        font-weight: bold;
    }

    input[type='checkbox'] {
        display: none;
        &:checked {
            & + label {
                i {
                    opacity: 1;
                }
            }
        }
    }

    label.icon {
        cursor: pointer;
        width: 48px;
        height: 48px;
        position: relative;
        font-size: 18px;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 4px solid var(--t1);
            background-color: var(--t0);
        }
        i {
            opacity: 0;
            font-size: 30px;
        }
    }
    &.inline {
        label.icon {
            width: 18px;
            height: 18px;
        }
        input[type='checkbox'] {
            display: none;
            &:checked {
                & + label {
                    background-color: var(--t1);
                }
            }
        }
    }
}
</style>
