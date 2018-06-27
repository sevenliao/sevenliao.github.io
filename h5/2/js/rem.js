 /*
    # 按照宽高比例设定html字体, width=device-width initial-scale=1版
    # @pargam win 窗口window对象
    # @pargam option{
    designWidth: 设计稿宽度，必须
    designHeight: 设计稿高度，不传的话则比例按照宽度来计算，可选
    designFontSize: 设计稿宽高下用于计算的字体大小，默认20，可选
    callback: 字体计算之后的回调函数，可选
    }
    # return Boolean;
    # xiaoweili@tencent.com
    # ps:请尽量第一时间运行此js计算字体
    */
    // !function(win, option) {
    //     var count = 0, 
    //     designWidth = option.designWidth, 
    //     designHeight = option.designHeight || 0, 
    //     designFontSize = option.designFontSize || 20, 
    //     callback = option.callback || null,
    //     root = document.documentElement,
    //     body = document.body,
    //     rootWidth, newSize, t, self;
    //     // root.style.width = 100%;
    //     console.log(document.documentElement)
    // //返回root元素字体计算结果
    // function _getNewFontSize() {
    // var scale = designHeight !== 0 ? Math.min(win.innerWidth / designWidth, win.innerHeight / designHeight) : win.innerWidth / designWidth;
    // return parseInt( scale * 10000 * designFontSize ) / 10000;
    // }
    // !function () {
    // rootWidth = root.getBoundingClientRect().width;
    // self = self ? self : arguments.callee;
    // //如果此时屏幕宽度不准确，就尝试再次获取分辨率，只尝试20次，否则使用win.innerWidth计算
    // if( rootWidth !== win.innerWidth &&  count < 20 ) {
    // win.setTimeout(function () {
    // count++;
    // self();
    // }, 0);
    // } else {
    // newSize = _getNewFontSize();
    // //如果css已经兼容当前分辨率就不管了
    // if( newSize + 'px' !== getComputedStyle(root)['font-size'] ) {
    // root.style.fontSize = newSize + "px";
    // return callback && callback(newSize);
    // };
    // };
    // }();
    // //横竖屏切换的时候改变fontSize，根据需要选择使用
    // win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    // clearTimeout(t);
    // t = setTimeout(function () {
    // self();
    // }, 300);
    // }, false);
    // }(window, {
    // designWidth: 1080, 
    // designHeight: 1920,
    // designFontSize: 100,
    // callback: function (argument) {
    // console.timeEnd("test")
    // }
    // });
"use strict";
var Dpr = 1,
    uAgent = window.navigator.userAgent;
var isIOS = uAgent.match(/iphone/i);
var isYIXIN = uAgent.match(/yixin/i);
var is2345 = uAgent.match(/Mb2345/i);
var ishaosou = uAgent.match(/mso_app/i);
var isSogou = uAgent.match(/sogoumobilebrowser/ig);
var isLiebao = uAgent.match(/liebaofast/i);
var isGnbr = uAgent.match(/GNBR/i);

function resizeRoot() {
    var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth,
        wDpr, wFsize;
    var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
    if (window.devicePixelRatio) {
        wDpr = window.devicePixelRatio;
    } else {
        wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
    }
    if (isIOS) {
        wWidth = screen.width;
        wHeight = screen.height;
    }
    // if(window.orientation==90||window.orientation==-90){
    //     wWidth = wHeight;
    // }else if((window.orientation==180||window.orientation==0)){
    // }
    if (wWidth > wHeight) {
        wWidth = wHeight;
    }
    wFsize = wWidth > 1080 ? 144 : wWidth / 6.4;
    wFsize = wFsize > 32 ? wFsize : 32;
    window.screenWidth_ = wWidth;
    if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) { //YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
        setTimeout(function() {
            wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth;
            wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
            wFsize = wWidth > 1080 ? 144 : wWidth / 6.4;
            wFsize = wFsize > 32 ? wFsize : 32;
            // document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
            // document.getElementById("fixed").style.display = "none";
        }, 500);
    } else {
        // document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        // document.getElementById("fixed").style.display = "none";
    }
    // alert("fz="+wFsize+";dpr="+window.devicePixelRatio+";UA="+uAgent+";width="+wWidth+";sw="+screen.width+";wiw="+window.innerWidth+";wsw="+window.screen.width+window.screen.availWidth);
}
resizeRoot();



// var width = document.documentElement.clientWidth;实际页面宽度
// 1rem = 55.2px = width/7.5 = width/(750/100);那么.2rem = 0.2rem = 20*width/750
// 我们将设计稿上此处的距离设置为?px，就有一个很简单的初中等式
// width(页面实际宽度)/750(设计稿宽度) = 0.2rem(某个元素实际距离，转换成rem单位)/?px(设计稿实际距离);将0.2rem的换算结果代入可得：
// width / 750 = 20 * width / (750 * ?);
// 可以逆推出? = 20px，根据这种布局方式，实际设计稿中的距离除以100的值作为实际的大小并冠以rem单位，就是实现适配的效果。