<template>
    <div class="index_page">
        <style v-if="$store.state.dark">
            :root {
            --t1: #eeeeee;
            --t2: #222831;
            color: #eeeeee;
            }
        </style>
        <style v-else>
            :root {
            --t1: #222831;
            --t2: #ffffff;
            color: #222831;
            }
        </style>
        <main>
            <Navbar v-show="!$store.state.inFrames" />
            <nuxt class="view" />
        </main>
        <no-ssr>
            <Dialog scrollable :click-to-close="false" />
        </no-ssr>
        <div v-show="$store.state.globalLoading" class="view-loading">
            <nya-loading />
        </div>
        <FloatBtn />
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Dialog from '../components/Dialog';
import FloatBtn from '../components/FloatBtn';
import dayjs from 'dayjs';
export default {
    name: 'Index',
    components: {
        Navbar,
        Dialog,
        FloatBtn
    },
    data() {
        return {
            loading: true
        };
    },
    watch: {
        '$store.state.dark'(val) {
            if (val) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    },
    mounted() {
        this.loading = false;
    }
};
</script>

<style lang="scss">
.index_page {
    .view-loading {
        z-index: 999;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #ffffff, $alpha: 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    main {
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 20px;
        background-color: var(--t2);
    }
}
</style>
