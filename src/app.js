import Vue from 'vue'
import App from './app.vue'
// simple toast 的使用
import Dialog from './components/index'
Vue.use(Dialog);

new Vue({
    el : '#app',
    template : '<div><App /></div>',
    components: {
        App
    }
})
