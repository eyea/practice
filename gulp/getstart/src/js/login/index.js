/**
 * @ignore  ====================================================================
 * @fileoverview 登录逻辑
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2016-04-16
 * @ignore  depend angular
 * @ignore  ====================================================================
 */

var pcLogin = require('./pcLogin.js');
var mobileComm = require('./mobileLogin.js');

var isPhone = {
	init: function() {
    	if(!this.isPc()) {
            $('body').attr('device','touch');
    		mobileComm.init();
    	}else{
            $('body').attr('device','pc');
    		pcLogin.init();
    	}
	},
	isPc : function ()  {  
       	var userAgentInfo = navigator.userAgent;  
       	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
       	var flag = true;
       	for (var v = 0; v < Agents.length; v++) {  
           if (userAgentInfo.indexOf(Agents[v]) > 0) { 
           		flag = false; 
           		break; 
           }  
       	}
       	return flag;
	}
};

module.exports = isPhone;