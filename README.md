# vuejs-dialog-plugin

安装
---
```
npm i vuejs-dialog-plugin
yarn add vuejs-dialog-plugin
```

使用
---
```
//es7
const Vue from 'vue'
const Dialog from 'vuejs-dialog-plugin'
Vue.use(Dialog)
...
this.$Dialog.Message("这里是提示内容","这里是标题")

//es6
var Vue = require('vue')
var Dialog = require('vuejs-dialog-plugin')
Vue.use(Dialog)
...
```

效果展示
---
```
this.$Dialog.Message(msg, title, option)
```
![](./resources/message.jpg '消息')
```
this.$Dialog.Alert(msg, title )
```
![](./resources/alert.jpg '消息')
```
this.$Dialog.Confirm(msg, title )
```
![](./resources/confirm.jpg '消息')
```
this.$Dialog.Prompt(title, defaultVal, placeholder)
```
![](./resources/prompt.jpg '消息')
