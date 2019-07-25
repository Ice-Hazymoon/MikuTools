<template>
    <div class="navbar">
        <header>
            <h1 class="title">
                <nuxt-link to="/">
                    MikuTools - 工具集合
                </nuxt-link>
            </h1>
            <Panel />
        </header>
    </div>
</template>

<script>
import Panel from '~/components/Panel';
export default {
    name: 'Navbar',
    components: {
        Panel
    }
};
</script>


<style lang="scss">
.navbar {
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 10px;
    h2 {
        font-size: 20px;
        margin-top: -40px;
    }
    button {
        font-weight: bold;
    }
    header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .title {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            color: var(--t1);
            cursor: pointer;
            text-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0.15);
            a {
                color: var(--t1);
                cursor: pointer;
                display: flex;
                align-items: center;
                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
