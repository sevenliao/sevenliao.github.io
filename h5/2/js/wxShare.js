

(function(win) {

	if(isWeiXin()){
        $.ajax({
            type: 'GET',
            url: 'http://share.yunnangames.cn/index.php?c=view&a=getWxConf&yy_appid=9416&url='+encodeURIComponent(location.href),
            dataType: 'json',
            success: function(data){
                console.log(encodeURIComponent(location.href),"=====")
                wx.config({
                   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                   appId: data.appId, // 必填，公众号的唯一标识
                   timestamp: data.timestamp, // 必填，生成签名的时间戳
                   nonceStr: data.nonceStr, // 必填，生成签名的随机串
                   signature: data.signature,// 必填，签名，见附录1
                   jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
               });
               wxShare();
            },
            error: function(xhr,errorType,error){
                console.log(xhr,errorType,error)
            }
        })
	}
	       
})(window);

/*
 * 判断是否为微信环境
 * 
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/*
 * 微信JS-SDK 分享类接口
 * @gameOver
 * @param {String} title    分享标题
 * @param {String} desc     分享描述
 * @param {String} link     分享链接
 * @param {String} imgUrl   分享图标
 * @allparam
 */
function wxShare() {
	wx.ready(function() {
		//分享给朋友
		wx.onMenuShareAppMessage({
			trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				shareSuccess(window.shareData.shareType);
			}
		});
		//分享到朋友圈
		wx.onMenuShareTimeline({
			trigger: function(res) {
				this.title = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				shareSuccess(window.shareData.shareType);
			} 
		});
		//QQ
        wx.onMenuShareQQ({
            trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				shareSuccess(window.shareData.shareType);
			}
        });
        //腾讯微博
        wx.onMenuShareWeibo({
            trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				shareSuccess(window.shareData.shareType);
			}
        });
        //QQ空间
        wx.onMenuShareQZone({
            trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				shareSuccess(window.shareData.shareType);
			}
        });
	});
	wx.error(function(res){
		console.log(res);
	});
}

/*
 * 分享成功
 * @shareSuccess
 * @param {Number} type  分享成功后调用的接口类型 0：不调用  1：分享没有金币  2：分享有金币
 * @allparam
 */
function shareSuccess(type){

	var ua = navigator.userAgent;
    if(ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
        system = 1;   //WX
    }else if (ua.indexOf("Android") > 0) {
        system = 2;   //Android
    }else if(ua.indexOf("iPhone") > 0){
        system = 3;   //IOS
    }else{
    	system = 1;   //PC
    }

}

/*
 * 获取链接参数的值
 * @shareSuccess
 * @param {String} str  参数名
 * @allparam
 */
function getQueryString(str) {
    var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
}

//读取cookie
function getCookie(c_name){
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return null;
};


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
};

//PC端获取链接参数
function GetPCQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = parent.window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
};

