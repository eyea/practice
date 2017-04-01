// scanCode index.js
var app = getApp();
Page({
	onLoad: function(){
	  console.log("进入识别二维码页面，开始读取数据...");
	  var that = this;
	  app.getScanCodeInfo(function(scanCodeInfo){
	  	//更新数据
	  	that.setData({
	  		scanCodeInfo: scanCodeInfo
	  	})
	  });

	}

})