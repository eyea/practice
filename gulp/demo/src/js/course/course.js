/**
 * @ignore  ====================================================================
 * @fileoverview video
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend angular
 * @ignore  ====================================================================
 */
var commentTpl = require('../tpl/comment/comment.html');

var video = {

    init: function() {
        this.isPhone();
        this.share();
    },

    // 字数处理
    dealWordsLen : function(str, len) {
        return str.substring(0, len);
    },

    // 时间处理
    dealTime : function (time) {
        var timeNow = Date.parse(new Date()),
            nowYear = (new Date()).getFullYear();

        var time    = time,
            cur     = Date.parse(new Date(time.replace(/-/g,"/"))),
            year    = (time.split(' ')[0]).replace(/-/g,"/").split('/')[0],
            month   = (time.split(' ')[0]).replace(/-/g,"/").split('/')[1],
            day     = (time.split(' ')[0]).replace(/-/g,"/").split('/')[2],
            hour    = time.split(' ')[1].split(':')[0],
            minutes = time.split(' ')[1].split(':')[1];

        var timeDiff = ((timeNow - cur)/1000);

        if( timeDiff < 60 ) {
            time = '刚刚';
        }else if(60 <= timeDiff && timeDiff < 3600) {
            time = Math.round(timeDiff/60) + '分钟前';
        }else if(3600 <= timeDiff && timeDiff < 43200) {
            time = Math.round(timeDiff/3600) + '小时前';
        }else if(43200 <= timeDiff) {
            if(year < nowYear) {
                time = year+'年'+month+'月'+day+'日 '+hour+':'+minutes;
            }else{
                time = month+'月'+day+'日 '+hour+':'+minutes;
            }
        }
        
        return time;
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

    share : function() {
        var pic = $('#course-photo').val() || 'http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png',
            desc = $('.video-title').html() + "_小饭桌创业课堂",
            wxUrl = "http://s.jiathis.com/qrcode.php?url="+window.location.href + '&f=wx',
            sinaUrl = "http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&url="+window.location.href+"&f=weibo&title="+desc+"&key=3301380851&pic="+pic;
            
        $('.panel-weixin img').attr('src',wxUrl);
        $('.sina').attr('href',sinaUrl);

        $('.weixin').on('mouseover', function(e) {
            e.preventDefault();
            $('.panel-weixin').fadeIn(200);
        }).on('mouseleave', function(e) {
            e.preventDefault();
            $('.panel-weixin').fadeOut(200);
        });
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

    // 点击出现大图
    showBigImg : function() {
        var _this =  this;
        if($('.class-detail').find('img')) {
            $('.class-detail').on('click', 'img', function(e) {
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

    // 微信回调函数
    callBack : function (data) {
        var wxurl = location.href;
        var wxtitle = $('#position').html()+$('#name').html()+':'+$('.video-title').html() + "_小饭桌创业课堂";
        var wxdes = "小饭桌创业课堂，创业者的第一堂课！";
        var wximg = $('#course-photo').val() || "http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png";

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
    }
};

module.exports = video;