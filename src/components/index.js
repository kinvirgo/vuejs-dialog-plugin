import DialogComponent from './vue-dialog-plugin.vue'
const Dialog = {};

Dialog.install = (Vue) => {
    const DialogConstructor = Vue.extend(DialogComponent);
    const instance = new DialogConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.$Dialog = {

    }
}

if (typeof window !== 'undefined' && window.Vue) {
    Vue.use(Dialog);
}

export default Dialog
