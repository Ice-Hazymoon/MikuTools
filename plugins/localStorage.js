import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    window.onNuxtReady(() => {
        // const { dispatch } = store;
        createPersistedState({
            key: 'miku_vuex',
            paths: ['dark', 'setting', 'syncTime', 'noticeId', 'welcome']
        })(store);
        // dispatch('initApp');
    });
};
