import axios from 'axios';

export default {
    upload(_this, file) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append('smfile', file);
            formData.append('format', 'json');
            axios
                .post('https://sm.ms/api/upload', formData)
                .then(resolve)
                .catch(reject);
        });
    },
    del(_this, deleteUrl) {
        axios
            .get(deleteUrl, {
                auth: false
            })
            .catch(() => {});
    }
};
