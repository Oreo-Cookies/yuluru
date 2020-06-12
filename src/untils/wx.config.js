import wx from 'weixin-js-sdk'
import axios from 'axios'
import base64 from 'base-64'
import config from './url_config'

let  getUrlCode = function () { // 截取url中的code方法
  let url = location.search
  // let url = 'http://wechat.hileader.com/?code=081JfOVX11nPKY0PI9WX173IVX1JfOVd&amp;state=lide&code=021VlvEu1fa0Ah0xtfFu1PrvEu1VlvET&state=lide#/'
  let theRequest = new Object()
  if (url.indexOf("?") != -1) {
    var str = url.substr(1)
    var strs = str.split("&")
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
    }
  }
  return theRequest
}
const getwxConfig = async () => {
  let url = 'http://wechat.hileader.com/'
  //window.location.href
  const res = await  axios.post(config.baseURL + '/wechat/wechat_login/getSign', {url: window.location.href})
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.data.appId, // 必填，公众号的唯一标识
    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    signature: res.data.data.signature,// 必填，签名
    jsApiList: ['chooseImage', 'uploadImage',] // 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
  })
  let info =  localStorage.getItem('info')

  if (!info) {
    let code = getUrlCode().code // 截取code
    if (code == null || code === '') { // 如果没有code，则去请求
      window.location.href = res.data.data.sq_url
    } else {
      let is_login = localStorage.getItem('code')
      if (!is_login) {
        const _res = await axios.post(config.baseURL +'/wechat/wechat_login/login', {code})
        if (_res.status != 200) return
        localStorage.setItem('code', base64.encode(_res.data.data.openid))
        localStorage.setItem('info',JSON.stringify( _res.data.data))
      }

    }
  }

}

export default getwxConfig
