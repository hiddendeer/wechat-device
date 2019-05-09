var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_name: '',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  searchInput: function(e) {
    this.setData({
      book_name: e.detail.value
    });
  },
  gotoDetail: function (e) {
    //获取书籍id
    let book_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/index/index?book_id=' + book_id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  searchSubmit: function() {
    var that = this;
    var book_name = that.data.book_name;
    if(book_name == ''){
      wx.showToast({
        title: '请填写书名',
        icon: 'info',
        duration: 1000
      });
      return false;
    }
    util.request({
      url: 'book/?name=' + book_name,
      method: 'GET',
      success: function(res) {
        var arr = Object.keys(res.data);
        if(arr.length == 0){
          wx.showToast({
            title: '未找到书籍',
            icon: 'info',
            duration: 1000
          });
          return false;
        }
        that.setData({
          list:res.data
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})