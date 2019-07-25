<template>
    <div class="text_autospace">
        <nya-container title="中英文自动加空格">
            <nya-input v-model="content" fullwidth rows="5" type="textarea" autofocus autocomplete="off" label="待处理的内容" placeholder="不能信任那些Terminal或Editor用白底的人" />
        </nya-container>

        <nya-container v-if="results" title="处理成功">
            <pre>{{ results }}</pre>
        </nya-container>
    </div>
</template>

<script>
import pangu from 'pangu';
export default {
    name: 'TextAutospace',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            content: ''
        };
    },
    computed: {
        results() {
            return pangu.spacing(this.content);
        }
    },
    methods: {}
};
</script>
