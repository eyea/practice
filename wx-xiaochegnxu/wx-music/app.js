//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 获得用户登录信息
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    mobileInfo:null,
    scanCodeInfo:null
  },
  // 获得手机相关信息
  getMobileInfo: function(test){
    var that = this;
    if(this.globalData.mobileInfo){
      typeof test == "function" && test(this.globalData.mobileInfo)
    }else{
      // 调用获取设备信息接口
      wx.getSystemInfo({
        success: function(info){
          that.globalData.mobileInfo = info;
          typeof test == "function" && test(that.globalData.mobileInfo);
          console.log('success');
          console.log(that.globalData.mobileInfo);
        },
        fail: function(err){
          console.log(err)
        },
        complete: function(){
          console.log("complete")
        }

      })
    }
  },
  // 获得扫描二维码的信息
  getScanCodeInfo: function(test){
    var that = this;
    if(this.globalData.scanCodeInfo){
      typeof test == "function" && test(this.globalData.scanCodeInfo)
    }else{
      // 调用获取设备信息接口
      wx.scanCode({
      success: (result) => {
            that.globalData.scanCodeInfo = result;
            typeof test == "function" && test(that.globalData.scanCodeInfo);
            console.log('success3');
            console.log(that.globalData.scanCodeInfo);
      },
      fail: (errMsg) => {
        wx.showToast({
          title: '扫码错误',
          icon: errMsg,
          duration: 2000
        })
      }
      })
        
    }
  },  
  onShow: function(){
    console.log('eyea')
  }
})