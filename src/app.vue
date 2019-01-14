<template>
<div>
    <button type="button" @click="message">message</button>
    <button type="button" @click="alert">alert</button>
    <button type="button" @click="confirm">Confirm</button>
    <button type="button" @click="prompt">prompt</button>
</div>
</template>
<script>
export default {
    name: "App",
    data: () => ({

    }),
    mounted(){

    },
    methods: {
        alert() {
            this.$Dialog.Alert("请求超时,请稍后重试。", "温馨提示").then((id) => {
                // 成功
                console.log(id);
            });
        },
        confirm() {
            this.$Dialog.Confirm("你已经提交过申请,请勿重复提交。", "确认提示").then((id) => {
                // 成功
                console.log(id);
            });
        },
        prompt() {
            this.$Dialog.Prompt("请输入金额", "1000", "请输入大于100整数的金额").then((id) => {
                // 成功
                console.log(id);
            });
        },
        message() {
            var title = "简介:百度";
            var msg = "百度（纳斯达克：BIDU），全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。";
            this.$Dialog.Message(msg, title, {
                button: ["我知道了",{
                    "立即访问" : {
                        "border-color" : "#fff"
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
            }).then((data)=>{
                // 回调
                console.log( data );
                if(data.id == 2){
                    window.open("https://www.baidu.com/");
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
