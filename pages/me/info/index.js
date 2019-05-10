var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '请选择性别',
    picker: ['男生', '女生'],
    first_name:'',
    address:'',
    sex:'',
    info:{},
    name:'请填写姓名',
    addressInfo:'请填写常住地',
    sexTxt:''
  },
  PickerChange(e) {
    console.log(e);
    var data = e.detail.value;
    if(data == 0){
      this.setData({
        index: '男生',
        sex:1
    });
    }else{
      this.setData({
        index: '女生',
        sex:0
      });
    }

  },
  firstnameInput:function(e){
    this.setData({
      first_name:e.detail.value
    });
  },
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    util.request({
      url: 'user/' + user_id,
      method: 'GET',
      success: function (res) {
        that.setData({
          info:res.data
        });
      }
    });

  },
  submit:function(){
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    var first_name = that.data.first_name;
    var sex = that.data.sex;
    var address = that.data.address;
    var data = { "first_name": first_name,"sex":sex,"address":address}
    console.log(data);
    util.request({
      url: 'user/' + user_id +'/update_user/',
      data:data,
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '已保存',
          duration:1000
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var sex = that.data.info;
    if (sex == 1) {
      that.setData({
        sexTxt: '男'
      });
    }
    if (sex == 0) {
      that.setData({
        sexTxt: '女'
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this;
    // var sex = that.data.info;
    // console.log(sex,66)
    // if(sex == 1){
    //   that.setData({
    //     sexTxt:'男'
    //   });
    // }
    // if (sex == 0) {
    //   that.setData({
    //     sexTxt: '女'
    //   });
    // }
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