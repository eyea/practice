// 手机信息

var app = getApp();

Page({
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  onLoad: function(){
	  console.log("成功获取到设备信息，开始更新数据");
	  var that = this;
	  app.getMobileInfo(function(systemData){
	  	//更新数据
	  	that.setData({
	  		mobileInfo: systemData
	  	})
	  });
  		
  },
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    systemData: {}
  }
})