/**
 * @ignore  ====================================================================
 * @fileoverview 首页
 * @author  wdojay@163.com
 * @ignore  created in 2016-05-07
 * @ignore  depend node.js
 * @ignore  ====================================================================
 */

var header = {
	init : function() {
		this.isTab();
		this.bind();
	},
	// 判断当前是哪个tab
	isTab: function() {
		var url = location.pathname;
		switch(url) {
			case '/':
				$('.fe').removeClass('off').addClass('on');
				break;
			case '/fe/':
				$('.fe').removeClass('off').addClass('on');
				break;
			case '/server/':
				$('.server').removeClass('off').addClass('on');
				break;
			case '/other/':
				$('.other').removeClass('off').addClass('on');
				break;
		}
	},
	bind: function() {
		var $nav = $('nav');
		$nav.on('click', 'li', function() {
			var $self = $(this);
			$self.find('a').removeClass('off').addClass('on')
			$self.siblings().find('a').removeClass('on').addClass('off');
		})
	}
}

module.exports = header;