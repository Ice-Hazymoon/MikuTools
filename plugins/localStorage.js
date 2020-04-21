import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    window.onNuxtReady(() => {
        // 初次访问使用系统设置，否则使用 localStorage
        store.commit('SET_STORE', {
            key: 'dark',
            value: window.matchMedia('(prefers-color-scheme: dark)').matches
        });

        // 使用期间更改主题时，切换
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addListener(({ matches }) => {
                store.commit('SET_STORE', {
                    key: 'dark',
                    value: matches
                });
            });
        // const { dispatch } = store;
        createPersistedState({
            key: 'miku_vuex',
            paths: ['dark', 'setting', 'syncTime', 'noticeId', 'welcome']
        })(store);
        // dispatch('initApp');
    });
};
