var util = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    title: '',
    bookList: [],
    btnBool: true,
    index: null,
    picker: ['河白', '杏仁黄', '护眼色'],
    color:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    util.request({
      url: 'chapter/?book_id=' + options.book_id,
      method: 'GET',
      success: function (res) {
        var step = that.data.step;
        console.log(res.data[step].title)
        that.setData({
          title: res.data[step].title,
          bookList: res.data
        });
        var step = that.data.step;
        var article = res.data[step].content;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });
  },

  PickerChange(e) {
    console.log(e);
    var color = ["rgb(255, 255, 255)", "rgb(250, 249, 222)","rgb(241, 229, 201)"];
    var index = e.detail.value;
    this.setData({
      color: color[index]
    })
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
  btnBack: function () {
    var step = this.data.step;
    var bookList = this.data.bookList;
    var book_id = bookList[step].book;
    var chapter_id = bookList[step].id;
    var user_id = wx.getStorageSync('user_id');
    var data = {"user_id":user_id,"book_id":book_id,"chapter_id":chapter_id}
    console.log(data,666)
    util.request({
      other_url: 'web/api/chapter/read_chapter/',
      data:data,
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    });

  },

  btnNext: function () {
    var that = this;
    var bookList = that.data.bookList;

    console.log(bookList.length, 66)
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
      title: bookList[step].title
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