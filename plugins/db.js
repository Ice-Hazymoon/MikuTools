import low from 'lowdb';
const LocalStorage = require('lowdb/adapters/LocalStorage');
const adapter = new LocalStorage('mikudb');
const db = low(adapter);

db.defaults({}).write();

import Vue from 'vue';
Vue.prototype.$db = db;

export default db;
