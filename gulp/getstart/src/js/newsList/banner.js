/**
 * @ignore  ====================================================================
 * @fileoverview 新闻列表banner
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend jquery
 * @ignore  ====================================================================
 */
var bannerTpl = require('../tpl/newsList/banner.html');

var banner = {

	init : function() {
		this.getBanner();
	},

	getBanner : function() {
		var _this = this;

		$.ajax({
			url: '/api/website/banners/',
			type: 'GET',
			dataType: 'json',
			success: function(res) {
				if(res.data.length > 0) {
					var bannerRender = template.compile(bannerTpl),
					bannerHtml = bannerRender({
						bannerData : res.data
					});

					$('.newsList-banner').html(bannerHtml);
					_this.bannerInit();
				}else{
					return;
				}
			}
		});
	},

	// banner参数
	bannerInit : function() {
		this.iNow = 0;
        this.timer = null;
        this.$items = $('#slideWrapper').children();
        this.bgUl = $('#dots');
        if (this.$items.length == 0) {
            return;
        }
        if(this.$items.length == 1) {
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

		var	$banners = $('.newsList-banner'),
			$arrow = $('.arrow'),
			$prev = $('.prev'),
			$next = $('.next');

		// 鼠标移动触发左右尖头,并且停止动画
		$banners.on('mouseenter', function(event) {
			event.preventDefault();
			event.stopPropagation();
			if(_this.$items.length == 1) {
	        	$('.arrow').hide();
	        }else{
	        	$('.arrow').show();
	        }
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
};

module.exports = banner;