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
function exam_request({ url, data, success, fail, complete, method = "GET" }) {
  // 开始请求
  url = 'http://localhost:7888/basic/web/index.php?r=' + url;
  console.log('ly_request:' + 'start:' + url);

  // 获取本地保存的session_id加入到每次请求中
  var session_id = wx.getStorageSync('user_id');//本地取存储的sessionID
  var user_id = wx.getStorageSync('user_id');//本地取user_id
  var header = { 'X-Requested-With': 'xmlhttprequest', 'Lingyun-Api': 'Lingyun-Api', 'content-type': 'application/x-www-form-urlencoded', 'Cookie': session_id, 'user-id': user_id }


  // 发起请求
  // console.log('session_id:' + session_id);
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    dataType: 'json',
    success: res => {
      if (session_id == "" || session_id == null) {
        // 如果本地没有就说明第一次请求 把返回的session id 存入本地
        wx.setStorageSync('PHPSESSID', res.data.session_id)
      }
      console.log(res)

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
  exam_request: exam_request,
}
