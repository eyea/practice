/**
 * @ignore  ====================================================================
 * @fileoverview 新闻列表页
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend jquery
 * @ignore  ====================================================================
 */
var listTpl = require('../tpl/newsList/newsList.html');

var newsList = {

	init: function() {
		this.pageNum = 1; // 当前页数
		this.pageSize = 10; //列表条数
		this.getMoreNewsList();
		this.isPhone();
		this.dealWeiBoSeo();
	},

	// 获取新闻列表
	getNewsList: function() {
		var _this = this;

		var data = {
			p: _this.pageNum,
			n: _this.pageSize
		};
		$.ajax({
			url: '/api/website/articles/',
			type: 'GET',
			dataType: 'json',
			data: data,
			beforeSend : function() {
				$('#content').append('<div class="loading"></div>');
				$('.more-news').hide();
			},
			success: function(res) {
				if (res.code == "200") {
					// 判断是否加载完毕
					if(res.data.length > 0) {
						var newsList = res.data;
						// 处理时间
	                    for(var i=0,len=newsList.length,str,cur,timeStatus,introLen;i<len;i++) {
	                        str = newsList[i].time.split(' ')[0];
	                        formatDate = str.split('-')[1]+'月'+str.split('-')[2]+'日';
	                        newsList[i].time = formatDate;

	                        // 判断文章列表title字数是否超过38个字
	                        if(newsList[i].title.length > 38) {
	                        	titleLen = newsList[i].title.substring(0,38)+'...';
	                        }else{
	                        	titleLen = newsList[i].title;
	                        }
	                        // 判断文章列表内容字数是否超过65个字
	                        if(newsList[i].title.length > 60) {
	                        	detailLen = newsList[i].intro.substring(0,60)+'...';
	                        }else{
	                        	detailLen = newsList[i].intro;
	                        }

	                        newsList[i].title = titleLen;
	                        newsList[i].intro = detailLen;
	                    }; 

						var render = template.compile(listTpl),
							html   = render({list: newsList});

						$('.loading').remove();
						$('#content').append(html);
						$('.more-news').show();
					}else{
						$('.loading').remove();
						$('.more-news').hide();
						return;
					}
					_this.getMoreNewsList();
				}
			}
		});
	},
	
	// 查看更多新闻列表
	getMoreNewsList: function() {
		var _this = this;
		// 查看更多
		$('.wrapper').off().on('click', '.more-news', function() {
			_this.pageNum++;
			_this.getNewsList();
		});
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
        }else{
            return;
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

    // 微信回调函数
    callBack : function (data) {
        var wxurl = location.href;
        var wxtitle = "小饭桌——创业从这里起步，中国最大的TMT行业创业者服务平台。";
        var wxdes = "优质创业课程培训、专业投融资顾问服务、深度创业内容报道。";
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

    // 微博优化
    dealWeiBoSeo : function() {
    	var ogTitle = "小饭桌—创业从这里起步，中国最大的TMT行业创业者服务平台。",
    		ogImg = 'http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png',
    		ogUrl = window.location.href;
    	$('#ogTitle').attr('content',ogTitle);
    	$('#ogImg').attr('content',ogImg);
    	$('#ogUrl').attr('content',ogUrl);
    }

};

module.exports = newsList;
