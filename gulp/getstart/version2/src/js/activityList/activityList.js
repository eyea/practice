/**
 * @ignore  ====================================================================
 * @fileoverview 活动列表
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend jquery
 * @ignore  ====================================================================
 */
var listTpl = require('../tpl/activityList/activityList.html'),
	bannerTpl = require('../tpl/activityList/banner.html');

var activityList = {

	init : function() {
		this.pageNum = 1; // 当前页数
		this.pageSize = 12; //列表条数
		this.getMoreNewsList();
		this.getBanner();
		this.isPhone();
		this.dealWeiBoSeo();
		$('title').html('小饭桌创业课堂_小饭桌_创业从这里起步');
	},
	getBanner : function() {
		var _this = this;

		$.ajax({
			url: '/api/website/active_banners/',
			type: 'GET',
			dataType: 'json',
			success: function(res) {
				if(res.code == "200") {
					if(res.data.length > 0) {
						var bannerRender = template.compile(bannerTpl),
						bannerHtml = bannerRender({
							bannerData : res.data
						});

						$('.activity-banner').html(bannerHtml);
						_this.bannerInit();
					}else{
						return;
					}
				}
			}
		});
	},

	// banner初始化
	bannerInit : function() {
		this.iNow = 0;
        this.timer = null;
        this.$items = $('#slideWrapper').children();
        this.bgUl = $('#dots');
        if (this.$items == 0) {
            return;
        }
        if(this.$items == 1) {
        	$('.arrow').hide();
        	$('.slideNum').hide();
        }
        this.bannerBind();
        this.auto();
        this.change();
	},

	auto : function() {
		var _this = this;
        clearInterval(_this.timer);
        _this.timer = setInterval(function() {
            if (_this.iNow >= _this.$items.length - 1) {
                _this.iNow = 0;
            } else {
                _this.iNow++;
            }
            _this.change();
        }, 4000);
	},

	// 切换方法
    change : function() {
        var _this = this;
        _this.$items.css({
            zIndex : 0
        }).eq(_this.iNow).css({
            zIndex : 1
        }).stop(false, true).fadeIn(2000).siblings().fadeOut(2000);
        _this.bgUl.find('li').removeClass('activeI').eq(_this.iNow).addClass('activeI');
    },

    // banner事件绑定
	bannerBind : function() {
		var _this = this;

		var	$banners = $('.activity-banner'),
			$arrow = $('.arrow'),
			$prev = $('.prev'),
			$next = $('.next');

		// 鼠标移动触发左右尖头,并且停止动画
		$banners.on('mouseenter', function(event) {
			event.preventDefault();
			event.stopPropagation();
			$arrow.show();
			clearInterval(_this.timer);
		}).on('mouseleave', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$arrow.hide();
			_this.auto();
		});

		//切换缩略图
        _this.bgUl.on('click', 'li', function() {
            $(this).addClass('activeI').siblings().removeClass('activeI');
            _this.iNow = $(this).index();
            _this.change();
        });

        $prev.click(function() {
            clearInterval(_this.timer);
            if (_this.iNow == 0) {
                _this.iNow = _this.$items.length-1;
            } else {
                _this.iNow--;
            }
            _this.change();
            _this.auto();
        });
        $next.click(function() {
            clearInterval(_this.timer);
            if (_this.iNow >=  _this.$items.length-1) {
                _this.iNow = 0;
            } else {
                _this.iNow++;
            }
            _this.change();
            _this.auto();
        });

	},

	// 获取活动列表
	getActivityList : function() {
		var _this = this;

		var data = {
			n: _this.pageSize,
			p: _this.pageNum
		};
		$.ajax({
			url: '/api/website/actives/',
			type: 'GET',
			data: data,
			beforeSend : function() {
				$('.loading').fadeIn();
				$('.more-activity').hide();
			},
			success: function(res) {
				if (res.code == "200") {
					if(res.data.length > 0) {
						if(res.data.length <12){
							$('.more-activity').hide();
						}
						var activityList = res.data;
						var today = Date.parse(new Date());
						var yearNow = Number((new Date()).getFullYear());
						// deal time
	                    for(var i=0,len=activityList.length,str,cur,timeStatus,introLen;i<len;i++) {
	                        str = activityList[i].begin_time.split(' ')[0];
	                        cur = Date.parse(new Date(str.replace(/-/g,"/")));
	                        // 判断年份
	                        if( Number(str.split('-')[0]) < yearNow) {
	                        	formatDate = str.split('-')[0] +'年'+ str.split('-')[1]+'月'+str.split('-')[2]+'日';
	                        }else{
	                        	formatDate = str.split('-')[1]+'月'+str.split('-')[2]+'日';
	                        }
	                        
	                        // 判断时间是否超过今天
	                        if(cur < today) {
	                        	timeStatus = ["0",formatDate];
	                        }else{
	                        	timeStatus = ["1",formatDate];
	                        }
	                        // 判断活动描述字数是否超过三行
	                        if(activityList[i].title.length > 40) {
	                        	introLen = activityList[i].title.substring(0,39)+'...';
	                        }else{
	                        	introLen = activityList[i].title;
	                        }
	                        activityList[i].begin_time = timeStatus;
	                        activityList[i].title = introLen;
	                    } 

						var render = template.compile(listTpl),
							html = render({
								listData: activityList
							});

						$('.activity-list').append(html);
					}else{
						$('.more-activity').hide();
					}
					$('.loading').hide();
					_this.getMoreNewsList();
					_this.bind();
				}
			}
		});
	},

	// 查看更多新闻列表
	getMoreNewsList: function() {
		var _this = this;
		// 查看更多
		$('.wrapper').off().on('click', '.more-activity', function() {
			_this.pageNum++;
			_this.getActivityList();
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
        var wxtitle = "小饭桌创业课堂—中国最大的TMT行业优质创业者私密交流社群。";
        var wxdes = "创业者的第一堂课，期待你的参与。";
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
    	var ogTitle = "小饭桌创业课堂——中国最大的TMT行业优质创业者私密交流社群。",
    		ogImg = 'http://7xpr29.com2.z0.glb.clouddn.com/1451901581x-1376440230.png',
    		ogUrl = window.location.href;
    	$('#ogTitle').attr('content',ogTitle);
    	$('#ogImg').attr('content',ogImg);
    	$('#ogUrl').attr('content',ogUrl);
    },

	// list事件绑定
	bind : function() {
		var _this = this;

		$('.button').on('click',function(event) {
			event.preventDefault();
			event.stopPropagation();
			var $self = $(this);
			if(this.hasClass('end')) {
				return;
			}else{
				window.open($self.data('go'));
			}
			
		});	

	}

};

module.exports = activityList;