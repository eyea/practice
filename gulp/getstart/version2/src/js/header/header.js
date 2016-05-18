/**
 * @ignore  ====================================================================
 * @fileoverview 公共头部
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend angular
 * @ignore  ====================================================================
 */

var header = {

	init : function() {
		var id = this.isNav();
		$('header li').eq(id).addClass('focus').siblings().removeClass('focus');
	},
	// 判断在哪个页面，然后给nav加载css
	isNav : function() {
		var navFocus = window.location.href;
		var index = 0;
		if(navFocus.indexOf('posts') > 0 || navFocus.indexOf('post') > 0) {
			index = 0;
		}else if(navFocus.indexOf('actives') > 0 || navFocus.indexOf('active') > 0 || navFocus.indexOf('events') > 0 || navFocus.indexOf('event') > 0 || navFocus.indexOf('course') > 0 || navFocus.indexOf('topic') > 0) {
			index = 1;
		}else if(navFocus.indexOf('fa') > 0) {
			index = 2;
		}else if(navFocus.indexOf('app') > 0) {
			index = 3;
		}else if(navFocus.indexOf('about') > 0 || navFocus.indexOf('service') > 0) {
			index = 4;
		}else{
			index = 0;
		}
		return index;
	}
};

module.exports = header;