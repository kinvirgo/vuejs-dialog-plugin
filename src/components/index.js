import DialogComponent from './vue-dialog-plugin.vue'
const Dialog = {};

Dialog.install = (Vue) => {
    const DialogConstructor = Vue.extend(DialogComponent);
    const instance = new DialogConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.$Dialog = {
        Message(msg, title, option){
            return new Promise((resolve, reject)=>{
                instance.message(msg, title, option);
                // 注册回调成功函数
                instance.resolve = (_id)=>{
                    instance.show = false;
                    resolve({
                        _id,
                    });
                }
            })
        },
        Alert(msg, title){
            return new Promise((resolve, reject)=>{
                instance.alert(msg, title, { isClose:false, lineClamp : 3 });
                // 注册回调成功函数
                instance.resolve = (_id)=>{
                    instance.show = false;
                    resolve({
                        _id,
                    });
                }
            });
        },
        Confirm(title, val){
            return new Promise((resolve, reject)=>{
                instance.confirm(title, val, { isClose:false, lineClamp : 3, button : ["我知道了"] });
                // 注册回调成功函数
                instance.resolve = (_id)=>{
                    instance.show = false;
                    resolve({
                        _id,
                    });
                }
            })
        },
        Prompt(title, val, placeholder){
            return new Promise((resolve, reject)=>{
                instance.prompt(title, val, placeholder, { isClose:false, vHtml:true });
                // 注册回调成功函数
                instance.resolve = (_id)=>{
                    instance.show = false;
                    resolve({
                        _id,
                        val : instance.promptVal
                    });
                }
            })
        }
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    Vue.use(Dialog);
}

export default Dialog
