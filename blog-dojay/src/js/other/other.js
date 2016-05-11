/**
 * @ignore  ====================================================================
 * @fileoverview 首页
 * @author  wdojay@163.com
 * @ignore  created in 2016-05-07
 * @ignore  depend node.js
 * @ignore  ====================================================================
 */

var listTpl = require('../tpls/list/list.html');

var list = {
	init: function(){
		// $('html').addClass('load');
		this.bind();
	},
	bind: function() {
		var _this = this;
		$.ajax({
			url: '/api/otherList/',
			type: 'GET',
			dataType: 'json',
			// data: {
			// 	pageNum: 1,
			// 	pageSize: 10
			// },
			success: function(res) {
				var data = res.data;
				// 处理content简介
				for(var i=0,len=data.length;i<len;i++) {
					if(data[i].content.length > 150) {
						data[i].content = data[i].content.substring(0,150)+'...';
					}else{
						data[i].content = data[i].content;
					}
				}

				var render = template.compile(listTpl),
					html = render({
						data : data
					});
				$('.page_other').html(html);
				$('html').removeClass('load');
			}
		});
	}
};

module.exports = list;