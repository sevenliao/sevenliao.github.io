---
layout: post
title: vue生命周期
category: vue
tags: 编码
keywords: vue生命周期,vue
---

用Vue框架，熟悉它的生命周期可以让开发更好的进行。

### **首先先看看官网的图，详细的给出了vue的生命周期:**

![vue生命周期图!](http://img.blog.csdn.net/20170303180741807?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjQwNzM4ODU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

它可以总共分为8个阶段：
beforeCreate（创建前）,
created（创建后）,
beforeMount(载入前),
mounted（载入后）,
beforeUpdate（更新前）,
updated（更新后）,
beforeDestroy（销毁前）,
destroyed（销毁后）
然后用一个实例的demo 来演示一下具体的效果：
<div id=app>{{a}}</div>
<script>
var myVue = new Vue({          
el: "#app",          
data: {
a: "Vue.js"        
},         
 beforeCreate: function() { 
         
console.log("创建前")            
console.log(this.a)            
console.log(this.$el)          
},         
 created: function() {
                console.log("创建之后");            
console.log(this.a)            
console.log(this.$el)          
},         
 beforeMount: function() {            
console.log("mount之前")            
console.log(this.a)            
console.log(this.$el)          
},          
mounted: function() {            
console.log("mount之后")            
console.log(this.a)            
console.log(this.$el)          
},          
beforeUpdate: function() {            
console.log("更新前");            
console.log(this.a)            
console.log(this.$el)          
},          
updated: function() {            
console.log("更新完成");            
console.log(this.a);            
console.log(this.$el)          
},          
beforeDestroy: function() {            
console.log("销毁前");            
console.log(this.a)            
console.log(this.$el)            
console.log(this.$el)          
},          
destroyed: function() {           
console.log("已销毁");          
console.log(this.a)          
console.log(this.$el)          
}   
  });  
</script>
运行后，查看控制台，
得到这个：

![vue生命周期图!](http://img.blog.csdn.net/20170303175839955?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjQwNzM4ODU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

![vue生命周期图!](http://img.blog.csdn.net/20170303175811283?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjQwNzM4ODU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

然后再methods 里面添加一个change方法：
<div id=app>{{a}}
<button v-on:click="change">change</button>
</div>
点击按钮之后出现的是：

![vue生命周期图!](http://img.blog.csdn.net/20170303180404473?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjQwNzM4ODU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

这就是vue的生命周期，很简单吧。
