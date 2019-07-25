export default function({ $axios, store }) {
    $axios.onRequest(config => {
        if (config.proxy) {
            config.url = store.state.env.proxy + config.url;
        }
        return config;
    });

    $axios.onResponse(response => {
        if (response.status !== 200) {
            return Promise.reject(response);
        } else {
            return response;
        }
    });

    $axios.onError(error => {
        return Promise.reject(error);
    });
}
