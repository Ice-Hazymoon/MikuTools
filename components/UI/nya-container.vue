<template>
    <section class="nya-container">
        <h2 class="nya-title">
            <i v-if="icon" :class="'eva eva-' + icon"></i>
            <span v-if="title">{{ title }}</span>
            <slot v-else name="title"></slot>
        </h2>
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.nya-container {
    position: relative;
    padding: 32px;
    padding-bottom: 24px;
    margin-bottom: 40px;
    border: 4px solid;
    border-color: var(--t1);

    h2.nya-title {
        top: -35px;
        display: table;
        padding: 0 5px;
        background-color: var(--t2);
        display: flex;
        align-items: center;
        position: absolute;
        i {
            margin-right: 8px;
            font-size: 30px;
        }
    }

    @media (max-width: 600px) {
        padding: 15px;
        padding-top: 30px;
        margin-bottom: 28px;
        h2.nya-title {
            top: -36px;
            padding: 0 5px;
            background-color: var(--t2);
        }
    }
    @media (max-width: 350px) {
        h2.nya-title {
            top: -30px;
        }
    }
}
</style>
