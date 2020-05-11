const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    history: [],
    device_no: "",
    project_name:"",
    device_list: []
  },
  onLoad() {

  },
  onReady() {
    wx.hideLoading()
  },
  onShow() {
    let app = getApp();
    app.validateToken();
  },

  device_no: function (e) {
    this.setData({
      device_no: e.detail.value
    });
  },

  addDevice: function (e) {
    var that = this;
    var device_no = that.data.device_no;
    var list = that.data.device_list;
    
    if (device_no =='') {
      wx.showToast({
        title: '设备号必填',
        icon: 'fail',
        duration: 1000
      });
      return false;
    }

    list.push(device_no);

    that.setData({
      device_list: list
    })
  },

  delDevice: function (e) {
    var that = this;
    var list = that.data.device_list;
    var key = e.target.dataset.key;
    list.splice(key,1);
    that.setData({
      device_list:list
    });
  },

  projectInput:function(e) {
    var that = this;
    that.setData({
      project_name: e.detail.value
    });
  },

  submit: function (e) {
    
    var that = this;
    var device_list = that.data.device_list;
    var project_name = that.data.project_name;
    if (device_list =='' || project_name=='') {
      wx.showToast({
        title: '设备号或项目名必填',
        icon: 'fail',
        duration: 1000
      });
      
      return false;
    }
    var data = {
      "device_no": device_list,
      "pro_name": project_name
    }
    var user_cache = wx.getStorageSync('user_cache');
    util.request({

      url: 'device-record/create-record'+'?token='+user_cache.token+'&u_id='+user_cache.id,
      method: 'POST',
      data: data,
      success: function (res) {
      
        var res = res.data.data;
        
        if (res.code == 200) {
          

          wx.showToast({
            title: '出库成功',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            device_list:[],
            device_no:"",
            project_name:""
          });

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



  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  gotoDetail: function (e) {
    //获取书籍id
    let book_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/reading/index?book_id=' + book_id,
      // url: '/pages/detail/index/index'
    })
  },
  showModal(e) {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    util.request({
      other_url: 'web/api/get_read_historys/?user_id=' + user_id,
      method: 'GET',
      success: function (res) {
        that.setData({
          history: res.data
        });
      }
    });
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  VerticalMain(e) {
  },
  searchCur: function (e) {
    wx.navigateTo({
      url: '/pages/detail/search/index',
    })
  },

})