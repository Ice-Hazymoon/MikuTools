<template>
    <nya-container v-if="favorites.length" title="收藏夹" icon="star-outline">
        <nuxt-link
            v-for="(tool, index) in favorites"
            :key="index"
            :to="tool.path"
            class="nya-btn"
        >
            {{ tool.name }}
        </nuxt-link>
    </nya-container>
</template>

<script>
export default {
    name: 'Favorites',
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                arr = arr.concat(tool.list);
            });
            return arr;
        },
        favorites() {
            let results = [];
            this.toolsList.forEach(tool => {
                if (
                    this.$store.state.setting.favorites.indexOf(tool.path) !==
                    -1
                )
                    results.push(tool);
            });
            return results;
        }
    }
};
</script>
