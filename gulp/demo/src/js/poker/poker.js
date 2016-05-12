var poker = {
    init : function () {
        this.isPc();
    },

    isPc : function () {
        var _this = this;
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
        if( flag == false) {
            _this.getWx();
            $('footer').hide();
        }
        
    },

    getWx : function() {
        var _this = this;

        $.ajax({
            url : '/api/website/signature/weixin/',
            type : 'post',
            data : {
                csrfmiddlewaretoken: $('.login-container input').val(),
                url : location.href
            },
            success : function(res) {
                _this.callBack(res.data);
            }
        });
    },

    callBack : function(data) {
        var _this = this;
        var timestamp = Date.parse(new Date());
        var wxurl = location.href;
        var wxtitle = "2016小饭桌杯全国创投德扑大赛";
        var wxdes = "2016小饭桌杯全国创投德扑大赛，最强创投明星邀你巅峰智力对决！";
        var wximg = "http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png";

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

module.exports = poker;