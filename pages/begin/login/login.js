var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: true,
    usernameInput: '',
    passwordInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否登录
    const user_cache = wx.getStorageSync('user_cache');
    if (user_cache !== '') {

      var timestamp = Date.parse(new Date()).toString();
      var timestamp_str = timestamp.replace(/(0+)$/g, "");
      var timestamp_int = parseInt(timestamp_str);

      if (timestamp_int > user_cache.expire) {
        wx.removeStorageSync('user_cache');
        wx.reLaunch({
          url: '/pages/begin/login/login',
        })
      } else {
        wx.switchTab({
          url: '/pages/device/index',
        })
      }


    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  submit: function () {

    var username = this.data.username;
    var password = this.data.password;
    console.log(username);
    if (username =='' || username == undefined) {
      
      wx.showToast({
        title: '账号必填',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }

    if (password =='' || password == undefined ) {
      wx.showToast({
        title: '账号必填',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }

    var data = {
      "username": username,
      "password": password
    }
    util.request({
      url: 'sign-in/login',
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res, 333);
        var res = res.data.data;


        if (res.code == 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          });

          wx.setStorageSync('user_cache', res.data)
          wx.switchTab({
            url: '/pages/device/index'
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'fail',
            duration: 1000
          })
        }
      }

    });
  },

  btnCancel:function () {
    wx.switchTab({
      url: '/pages/device/index',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toLogin: function () {
    this.setData({
      login: true
    })
  },
  toRegister: function () {
    this.setData({
      login: false
    })
  },
  btnRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})