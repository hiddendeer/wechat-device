var util = require('../../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    personInfo: {},
    full_name:'',
    score: '',
    sign_status: 0
  },

  btnInfo: function (e) {
    console.log(e)
  },
  attached() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();

    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      var that = this;

      var user_cache = wx.getStorageSync('user_cache');

      if (user_cache !== '') {

        that.setData({
          sign_status: 1,
          full_name:user_cache.full_name
        })

        wx.getUserInfo({
          complete: (res) => {
            that.setData({
              personInfo: res.userInfo
            })
          },
        })
      }

      var data = that.data.sign_status;


      // var that = this;
      // var user_id = wx.getStorageSync('user_cache').id;
      // var token = wx.getStorageSync('user_cache').token;

      // util.request({
      //   url:'info/user-info'+'?token='+token+'&u_id='+user_id,
      //   methods:'GET',
      //   success:function(res){
      //     var res = res.data.data;

      //     that.setData({
      //       personInfo:res.data,
      //     });
      //   }
      // });
    },
    hide() {},
    resize() {},
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    // btnSign(e){
    //   wx.showToast({
    //     title: '今日已签到',
    //     duration:1000
    //   })
    // },
    showModal(e) {

    },
    // btnScore:function(){
    //   var that = this;
    //   var id = wx.getStorageSync('user_id');
    //   var user_id = { "user_id": id }
    //   that.setData({
    //     sign_status:1
    //   });
    //   util.request({
    //     other_url: 'web/api/sign_in/',
    //     data: user_id,
    //     method: 'POST',
    //     success: function (res) {
    //       var score = that.data.score + 10;
    //       that.setData({
    //         score: score
    //       });
    //     }
    //   });
    //   wx.showToast({
    //     title: '已签到',
    //     duration: 1000,
    //   });

    // },
    // CopyLink(e) {
    //   wx.setClipboardData({
    //     data: e.currentTarget.dataset.link,
    //     success: res => {
    //       var id = wx.getStorageSync('user_id');
    //       var user_id = { "user_id": id }
    //       util.request({
    //         other_url: 'web/api/sign_in/',
    //         data: user_id,
    //         method: 'POST',
    //         success: function (res) {
    //           var score = this.data.score + 10;
    //           this.setData({
    //             score: score
    //           });
    //         }
    //       });
    //       wx.showToast({
    //         title: '已签到',
    //         duration: 1000,
    //       });

    //     }
    //   })
    // },

    //跳转到登录页
    btnSignIn: function () {
      wx.reLaunch({
        url: '/pages/begin/login/login',
      })
    },

    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg'
      })
    },
  }
})