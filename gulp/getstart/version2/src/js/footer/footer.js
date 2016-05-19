/**
 * @ignore  ====================================================================
 * @fileoverview 公共底部
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend angular
 * @ignore  ====================================================================
 */

var footerTpl = require('../tpl/footer/footer.html');

var footer = {
	init : function() {
		this.isHome();
		this.showWx();
	},
	showWx : function() {
		var _this = this;
		$('.showWx').on('mouseenter', function() {
			$('.wxQr').fadeIn(500);
		}).on('mouseleave', function() {
			$('.wxQr').fadeOut(500);
		});
	},
	isHome : function() {
		if(location.pathname == '/' || location.pathname == '/posts/') {
			this.getFootPartner();
		}
	},
	getFootPartner : function() {
		var _this = this;

		$.get('/api/website/partners/', function(res) {
			// var data = JSON.parse(res);
			if(res.code == "200") {
				var partnerRender = template.compile(footerTpl),
					partnerHtml = partnerRender({
						partnerData : res.data
					});

				$('.footer-partner').html(partnerHtml);
			}
		});
	}	
};

module.exports = footer;