/**
 * @ignore  ====================================================================
 * @fileoverview 新闻详情
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend jquery
 * @ignore  ====================================================================
 */

var newsDetail = {

	init : function() {
        // 动态处理title
        $('title').html($('#article-title').val()+'_小饭桌_创业从这里起步');
		this.share();
		// this.dealWeiBoSeo();
        this.isPhone();
	},

	// 判断是不是移动端
	isPhone : function () {
        var userAgentInfo = navigator.userAgent,
        	flag = false,
        	Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
        	
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }else{
                flag = false;
            }
        }

        if(flag) {
            this.getWx();
            this.showBigImg();
        }else{
            return;
        }
    },

    // 点击出现大图
    showBigImg : function() {
        var _this =  this;
        if($('.content-detail').find('img')) {
            $('.content-detail').on('click', 'img', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var self = $(this);
                $('.mask').show();
                $('.bigImg').html('<img src='+self.attr('src')+' style="width:100%">');
                _this.pinchImg();
            });
            $('.mask').on('click',function() {
                $(this).hide();
                $('.pinch-zoom-container').remove();
                $(this).html('<div class="bigImg"></div>');
            });
        }
    },

    // 手势放大缩小
    pinchImg : function() {
        $('.bigImg').each(function () {
            new RTP.PinchZoom($(this), {});
        });
    },

    share : function() {
    	var pic = $('#article-photo').val() || 'http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png',
    		desc = $('#article-title').val()+'@小饭桌创业课堂',
    		wxUrl = "http://s.jiathis.com/qrcode.php?url="+window.location.href + '&f=wx',
    		sinaUrl = "http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&url="+window.location.href+"&f=weibo&title="+desc+"&key=3301380851&pic="+pic;
    		
    	$('.panel-weixin img').attr('src',wxUrl);
    	$('.sina').attr('href',sinaUrl);

    	$('.weixin-top').on('mouseover', function(e) {
    		e.preventDefault();
    		$('.panel-weixin-top').fadeIn(200);
    	}).on('mouseleave', function(e) {
    		e.preventDefault();
    		$('.panel-weixin-top').fadeOut(200);
    	});
    	
    },

    dealWeiBoSeo : function() {
    	var ogTitle = $('#article-title').val()+'_小饭桌，创业者服务平台',
    		ogImg = $('#article-photo').val() || 'http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png',
    		ogUrl = window.location.href;
    	$('#ogTitle').attr('content',ogTitle);
    	$('#ogImg').attr('content',ogImg);
    	$('#ogUrl').attr('content',ogUrl);
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
    // 微信回调函数
    callBack : function (data) {
        var wxurl = location.href;
        var wxtitle = $('#article-title').val();
        var wxdes = $('#article-intro').val() || "来自小饭桌新媒体报道—发现优质创业项目，报道深度创业案例。";
        var wximg = $('#article-photo').val() || "http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png";

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.app_id, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
    }
	
};

module.exports = newsDetail;
