var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    twopassword: ''
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  usernameInput: function (e) {
    this.data.username = e.detail.value;
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },
  twoPassword: function (e) {
    this.data.twopassword = e.detail.value;
  },
  phone: function (e) {
    this.data.phone = e.detail.value;
  },
  full_name: function (e) {
    this.data.full_name = e.detail.value;
  },

  submit: function () {
    var username = this.data.username;
    var password = this.data.password;
    var phone = this.data.phone;
    var full_name = this.data.full_name;
    // var twopassword = this.data.twopassword;
    // if (password !== twopassword) {
    //   wx.showToast({
    //     title: '密码不一致',
    //     icon: 'loading',
    //     duration: 1000
    //   });
    //   return false;
    // }
    var data = { 'username': username, 'password': password,'phone': phone,'full_name': full_name };
    util.request({
      url: 'sign-up/register',
      method: 'POST',
      data: data,
      success: function (res) {
        var res = res.data.data;
       
        if (res.code == 200) {
          setTimeout(function(){
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
          },2000);
          
          wx.reLaunch({
            url: '/pages/begin/login/login'
          })
        } else {
          
          wx.showToast({
            title: '注册失败',
            icon: 'fail',
            duration: 3000
          })
          
          wx.reLaunch({
            url: '/pages/begin/register/register'
          })

        }
      }

    });
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

  }
})