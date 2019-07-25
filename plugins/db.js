import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
const adapter = new LocalStorage('mikudb');
const db = low(adapter);

db.defaults({
    id: '',
    noticeId: false
}).write();

const Vue = require('vue').default;
Vue.prototype.$db = db;

export default db;
