import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'miku_vuex',
            paths: ['dark', 'setting']
        })(store);
    });
};
