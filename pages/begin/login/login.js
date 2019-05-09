var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: true,
    usernameInput:'',
    passwordInput:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  usernameInput:function(e){
    this.setData({
      username:e.detail.value
    });
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  submit:function(){
    var username = this.data.username;
    var password = this.data.password;
    var data = {"username":username,"password":password}
    util.request({
      other_url: 'admin/handerlogin/',
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res);
        var res = res.data.error_code;
        if (res !== 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateTo({
            url: '/pages/recommend/index'
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'fail',
            duration: 1000
          })
        }
      }

    });
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
  btnRegister:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})