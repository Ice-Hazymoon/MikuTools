<template>
    <div class="navbar">
        <header>
            <h1 class="title">
                <nuxt-link to="/">
                    MikuTools - 工具集合
                </nuxt-link>
                <template v-if="$store.state.dark">
                    <i class="eva eva-sun-outline" @click="switchTheme"></i>
                </template>
                <template v-else>
                    <i class="eva eva-moon-outline" @click="switchTheme"></i>
                </template>
            </h1>
            <div class="subtitle">
                <i class="eva eva-heart-outline"></i>
                <span>更多工具追加中</span>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        switchTheme() {
            this.$store.commit('SET_STORE', {
                key: 'dark',
                value: !this.$store.state.dark
            });
        }
    }
};
</script>


<style lang="scss">
.navbar {
    h2 {
        font-size: 20px;
        margin-top: -40px;
    }
    button {
        font-weight: bold;
    }

    header {
        width: 100%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .login-info {
            color: #2b8fdc;
        }
        .title {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            color: var(--t1);
            cursor: pointer;
            a {
                color: var(--t1);
                cursor: pointer;
                &:hover {
                    text-decoration: none;
                }
            }
            i {
                margin-left: 6px;
                cursor: pointer;
            }
        }
        .subtitle {
            display: flex;
            align-items: center;
            font-size: 16px;
            margin-top: 5px;
            opacity: 0.8;
            i {
                font-size: 20px;
                margin-right: 5px;
            }
        }
    }
}
</style>
