export default function({ $axios }) {
    $axios.onRequest(config => {
        if (config.proxy) {
            config.url = 'https://api.imiku.me/_proxy/' + config.url;
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
        if (!error.response) {
            return Promise.reject(error);
        }
        return Promise.reject(error.response.data.msg);
    });
}
