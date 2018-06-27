/**
    微信分享
*/
var wxShare = (function (w) {
    var webApiHost = "";
    var shareData = { title: '', desc: '', img: '', link: '' };


    function wxJSTools() {
    }


    /**
        配置酒名片微信分享接口（需要传入自定义标题等信息)
    */
    wxJSTools.prototype.configJMPShare = function (apiHost, title, desc, img, link) {
        var _this_ = this;


        webApiHost = apiHost;
        shareData.title = title;
        shareData.desc = desc;
        shareData.img = img;
        if (!link) {
            shareData.link = 'http://m.ganjiuhui.com';
        }
        else {
            shareData.link = link.indexOf("http:") >= 0 ? link : ('http://m.ganjiuhui.com' + link);
        }


        _this_.configWxJSSDK();
    }


    /**
        配置微信JSSDK
    */
    wxJSTools.prototype.configWxJSSDK = function () {
        if (!wx)
        { return; }


        $.get(webApiHost + "/api/weixin/jssignature", { url: w.location.href }, function (ret) {
            if (ret && ret.IsSucceed) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: ret.Data.AppId, // 必填，公众号的唯一标识
                    timestamp: ret.Data.Timestamp, // 必填，生成签名的时间戳
                    nonceStr: ret.Data.NonceStr, // 必填，生成签名的随机串
                    signature: ret.Data.Signature,// 必填，签名，见附录1
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    jsApiList: [
                    "onMenuShareTimeline",          //朋友圈
                    "onMenuShareAppMessage",         //好友
                    "onMenuShareQQ",                //QQ                    
                    "onMenuShareQZone"                //QQ空间
                    ]
                });


                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: shareData.title,
                        link: shareData.link,
                        imgUrl: shareData.img,
                        success: function (res) { },
                        cancel: function (res) { }
                    });
                    wx.onMenuShareAppMessage({
                        title: shareData.title,
                        desc: shareData.desc,
                        link: shareData.link,
                        imgUrl: shareData.img,
                        success: function (res) { },
                        cancel: function (res) { }
                    });
                    wx.onMenuShareQQ({
                        title: shareData.title,
                        desc: shareData.desc,
                        link: shareData.link,
                        imgUrl: shareData.img,
                        success: function (res) { },
                        cancel: function (res) { }
                    });
                    wx.onMenuShareQZone({
                        title: shareData.title,
                        desc: shareData.desc,
                        link: shareData.link,
                        imgUrl: shareData.img,
                        success: function (res) { },
                        cancel: function (res) { }
                    });
                });
            }
        });
    }


    return new wxJSTools();
})(window);