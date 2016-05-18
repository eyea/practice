/**
 * @ignore  ====================================================================
 * @fileoverview fa
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend angular
 * @ignore  ====================================================================
 */

var fa = {
	init : function() {
		this.isPhone();
		this.dealWeiBoSeo();
		$('title').html('小饭桌投融资服务_FA_小饭桌_创业从这里起步');
	},

	// 判断是不是移动端
	isPhone : function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }else{
                flag = true;
            }
        }
        if(!flag) {
        	this.getWx();
        }else{
        	this.bind();
        }
        
    },

    // 微信分享 
    getWx : function() {
        var _this = this;
        var data = {
            url : location.href,
            csrfmiddlewaretoken: $('.login-container input').val()
        };
        $.ajax({
            url : '/api/website/signature/weixin/',
            type : 'post',
            data : data,
            success : function(res) {
                _this.callBack(res.data);
            }
        });
    },

    // 微博优化
    dealWeiBoSeo : function() {
    	var ogTitle = "小饭桌投融资服务—高效用心，并不仅仅是FA！",
    		ogImg = 'http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png',
    		ogUrl = 'http://www.xfz.cn/';
    	$('#ogTitle').attr('content',ogTitle);
    	$('#ogImg').attr('content',ogImg);
    	$('#ogUrl').attr('content',ogUrl);
    },

    // 微信回调函数
    callBack : function (data) {
        var wxurl = location.href;
        var wxtitle = "小饭桌投融资服务—高效用心，并不仅仅是FA！";
        var wxdes = "全程一对一跟踪服务，你身边万能的融资小助手。";
        var wximg = "http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png";

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.app_id, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        wx.ready(function(){
            wx.onMenuShareTimeline({
                title: wxtitle, // 分享标题
                link: wxurl, // 分享链接
                imgUrl: wximg, // 分享图标
                desc: wxdes,
                success: function () { 
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: wxtitle, // 分享标题
                link: wxurl, // 分享链接
                imgUrl: wximg, // 分享图标
                desc: wxdes,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { 
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },

	bind : function() {
		
		$(window).scroll(function() {
			var scrollTop = document.body.scrollTop;
			var height = $(document).height() - 158 - $(window).height();

			if(scrollTop >= height) {
				$('.float-mail').hide();
				$('.float-mail-bottom').show();
			}else{
				$('.float-mail').show();
				$('.float-mail-bottom').hide();
			}
		});
	}
};

module.exports = fa;