import Vue from 'vue';
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';

Vue.use(VueNoty, {
    theme: 'sunset',
    timeout: 5000
});
