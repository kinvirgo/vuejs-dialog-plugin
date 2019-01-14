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
const Vue from 'vue'
const Dialog from 'vuejs-dialog-plugin'
Vue.use(Dialog)
...
this.$Dialog.Message("这里是提示内容","这里是标题")

var Vue = require('vue')
var Dialog = require('vuejs-dialog-plugin')
Vue.use(Dialog)
...
```
## 参数
-   msg [String] : 展示的内容
-   title [String] : 展示的标题
-   option [Object] 可选:  扩展配置
    -   vHtml [Boolean] : 渲染方式以html渲染,默认false
    -   button [Array<String, Object>] : 按钮数量,可以是 String 或者 { "按钮名称" : {/\* 按钮样式 \*/} }
    - titlEffect [String] : 标题展示位置,有left、center、right可选,默认left
    - btnReverse [Boolean] : 按钮反序排列即从右往左排列,默认false
    - btnEffect [String] : 按钮展示位置,有left、center、right可选,默认center
    - isClose [Boolean] : 是否渲染右上角关闭按钮, 默认true
    - lineClamp [Number] : 内容最多显示几行,溢出省略 ≤ 10, 默认6
    - dialogStyle [Object] : 弹窗容器自定义(行内)样式
    - bgStyle [Object] : 弹窗背景自定义(行内)样式
    - titleStyle [Object] : 弹窗标题自定义(行内)样式
    - messageStyle [Object] : 弹窗内容自定义(行内)样式
    - footerStyle [Object] : 弹窗按钮容器自定义(行内)样式

## 自定义按钮样式使用示例

```
this.$Dialog.Message(msg, title, {
    button: ["我知道了",{
        "立即访问" : {
            "border-color" : "#fff",
            "color" : "#127BEF"
        }
    }],
    // btnEffect: "right",
    titlEffect : 'center',
    vHtml: false,
    lineClamp : 6,
    bgStyle : {
        "background-image" : `url(${require('./../resources/bg-1.jpg')})`,
        // "opacity": .1
    },
    titleStyle : {
        'color' : "#173162"
    },
    messageStyle : {
        'color' : "#1E3C84",
        'font-size' : "14px",
    }
})

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
