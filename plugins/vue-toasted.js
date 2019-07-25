import Toasted from 'vue-toasted';
import Vue from 'vue';
let config = {
    position: 'top-center',
    duration: 2000,
    className: 'miku-toasted'
};

if (window.innerWidth < 700) {
    config.fullWidth = true;
}

Vue.use(Toasted, config);
