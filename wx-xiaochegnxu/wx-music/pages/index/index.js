//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎回来',
    listen: '开始听音乐',
    userInfo: {},
    scanEntryText: "识别二维码",
    getMobileDate: "获取手机参数"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewMusic: function(){
    wx.navigateTo({
      url: '../music/index'
    })
  },
  bindViewScanCode: function(){
    wx.navigateTo({
      url: '../scanCode/index'
    })
  },
  bindViewMobileData: function(){
    wx.navigateTo({
      url: '../getMobileData/index'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
