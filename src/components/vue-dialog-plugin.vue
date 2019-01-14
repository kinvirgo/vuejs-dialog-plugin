<template>
    <div vue-dialog-plugin >
        <!-- mask -->
        <div class="d-dialog-mask" v-show="show"></div>
        <!-- dialog -->
        <div class="d-dialog-section" v-show="show" :style="option.dialogStyle">
            <!-- dialog-section-background -->
            <div class="d-dialog-section-bg" :style="option.bgStyle"></div>
            <!-- btn-close -->
            <button class="d-dialog-btnClose" v-if="!!option.isClose" type="button" @click="resolve(0)">×</button>
            <!-- v-text 渲染text -->
            <template v-if="!option.vHtml">
                <!-- dialog-head -->
                <div class="d-dialog-head" :class="`title-effect-${option.titlEffect}`" v-if="!!dialogTitle">
                    <h4 :style="option.titleStyle">{{dialogTitle}}</h4>
                </div>
                <!-- dialog-body -->
                <div class="d-dialog-body" :style="option.messageStyle">
                    <div class="d-dialog-message" :class="`line-clamp-${option.lineClamp}`">{{dialogMessage}}</div>
                </div>
            </template>
            <!-- v-html 渲染html -->
            <template v-else>
                <!-- dialog-head -->
                <div class="d-dialog-head" :class="`title-effect-${option.titlEffect}`">
                    <h4 :style="option.titleStyle" v-html="dialogTitle"></h4>
                </div>
                <!-- dialog-body -->
                <div class="d-dialog-body">
                    <!-- dialogType==4 -->
                    <template v-if="dialogType == 4" >
                        <div class="d-dialog-message" :class="`line-clamp-${option.lineClamp}`" >
                            <input type="text" class="d-dialog-prompt-input" :placeholder="promptPlaceholder" v-model="promptVal">
                        </div>
                    </template>
                    <template v-else >
                        <div class="d-dialog-message" :class="`line-clamp-${option.lineClamp}`" :style="option.messageStyle" v-html="dialogMessage"></div>
                    </template>
                </div>
            </template>
            <!-- dialog-footer -->
            <ul class="d-dialog-footer sn-f-cb" :class="`btn-group-${option.button.length} btn-effect-${option.btnEffect} btn-item-${!!option.btnReverse ? 'right' : 'left'}`" v-if="option.button && option.button.length > 0" :style="option.footerStyle">
                <li v-for="(item, index) in option.button" class="btn-item">
                    <button type="button" :class="`btn-item-${index+1}`" :style="getBtnStyle(item)" @click="resolve(index+1)">{{getBtnVal(item)}}</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "Dialog",
    data: () => ({
        dialogTitle : "",
        dialogMessage : "",
        show : false,
        option : {},
        promptVal : "", //prompt 默认值
        promptPlaceholder : "", //prompt 的placeholder
        dialogType : 1, //1-message、2-alert、3-confirm、4-prompt
        config : {
            vHtml : false, //是否html渲染 一般不建议使用
            module : ["title","footer"], //title-标题模块, body-内容展示模块（默认有） , footer-操作模块
            button : ["确认","取消"], //按钮模块,从做只有对应顺序,id是对应的索引
            btnEffect : "center",
            btnReverse: false, //按钮反序排列即做有往右排列
            titlEffect : "left",
            isClose : true, //是否关闭按钮
            lineClamp : 6, //内容最多显示几行,溢出省略 ≤ 10
            onTitle : false, //用于鼠标显示内容（主要是在内容溢出[信息多]时候使用）
            dialogStyle : {}, //弹窗容器样式定义
            bgStyle : {}, //弹窗背景样式 主要用于替换背景
            titleStyle : {}, //标题样式
            messageStyle : {}, //消息、内容模块样式
            footerStyle : {}, //消息、内容模块样式
        }
    }),
    methods:{
        message(msg = "", title = "", option ={}){
            // 综合配置
            //警告
            const {config} = this;
            this.dialogType = 1;
            this.option = {...config, ...option};
            this.dialogTitle = title;
            this.dialogMessage = msg;
            this.show = true;
        },
        alert(msg="", title = "警告", option = {}){
            // 警告提示、option保留配置以便后期开发
            const {config} = this;
            this.dialogType = 2;
            this.option = {...config, ...option};
            this.dialogTitle = title;
            this.dialogMessage = msg;
            this.show = true;
        },
        confirm(msg="", title = "确认提示", option = {}){
            // 确认
            const {config} = this;
            this.dialogType = 3;
            this.option = {...config, ...option};
            this.dialogTitle = title;
            this.dialogMessage = msg;
            this.show = true;
        },
        prompt(title="提示信息", val="", placeholder = "", option = {}){
            // 提示
            const {config} = this;
            this.dialogType = 4;
            this.option = {...config, ...option};
            this.promptVal = val;
            this.promptPlaceholder = placeholder;
            this.dialogTitle = title;
            // this.dialogMessage = `<input type="text" v-model="promptVal" />`;
            this.show = true;
        },
        getBtnVal(item){
            if(Object.prototype.toString.call(item) === "[object String]"){
                return item;
            }else if(Object.prototype.toString.call(item) === "[object Object]"){
                const itemArr = Object.keys(item);
                return itemArr[0];
            }else{
                return '-'
            }
        },
        getBtnStyle(item){
            if(Object.prototype.toString.call(item) === "[object Object]"){
                const key = Object.keys(item)[0];
                return item[key];
            }else{
                return {};
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import './vue-dialog-plugin.scss'
</style>
