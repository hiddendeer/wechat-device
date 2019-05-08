const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 封装微信的wx.request主要每次请求自动加上session_id
// 这里有一个全局的API接口域名配置，如果需要更改找到url='http://127.0.0.1'修改即可
function request({ url, data, success, fail, complete, method = "GET" }) {
  // 开始请求
  url = 'http://47.92.38.55/cms/api/' + url;
  console.log('ly_request:' + 'start:' + url);

  // 获取本地保存的user_id加入到每次请求中
  var user_id = wx.getStorageSync('user_id');//本地取user_id
  var header = { 'X-Requested-With': 'xmlhttprequest', 'Reading-Api': 'Reading-Api', 'content-type': 'application/x-www-form-urlencoded', 'user-id': user_id }

  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    dataType: 'json',
    success: res => {

      // 全局登陆提示
      if (res.data.login == '1') {
        wx.showModal({
          title: '提示',
          content: res.data.info,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/login/index/index',
              })
              console.log('用户点击确定')
            } else if (res.cancel) {
              if (method == "GET") {
                wx.navigateBack({
                  delta: 1
                });
              }
            }
          }
        });
        return;
      }
      success(res); // 调用用户success方法
    },
    fail: fail,
    complete: complete
  })
}

module.exports = {
  formatTime: formatTime,
  request: request,
}
