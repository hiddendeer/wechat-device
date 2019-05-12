var util = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:0,
    title:'',
    bookList:[],
    btnBool:true
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    var that = this;
  
    util.request({
      url: 'chapter/?book_id='+options.book_id,
      method: 'GET',
      success: function (res) {
        var step = that.data.step;
        console.log(res.data[step].title)
        that.setData({
          title:res.data[step].title,
          bookList:res.data
        });
        var step = that.data.step;
        var article = res.data[step].content;
        WxParse.wxParse('article', 'html', article,that,5);
      }
    });
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
  btnBack:function(){
    console.log('111')
  },

  btnNext:function(){
    var that = this;
    var bookList = that.data.bookList;

    console.log(bookList.length,66)
    var step = that.data.step;
    step = step + 1;
    if (bookList.length == step) {
      that.setData({
        btnBool: false,
      });
      wx.showToast({
        title: '到底啦',
        icon: 'success',
        duration: 2000
      })
      
      return false;
    }
        that.setData({
          step: step,
          title:bookList[step].title
        });
        console.log(step)

    var article = bookList[step].content;
    WxParse.wxParse('article', 'html', article, that, 5);
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