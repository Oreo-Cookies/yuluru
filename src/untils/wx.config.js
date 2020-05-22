import wx from 'weixin-js-sdk'
import axios from 'axios'
import base64 from 'base-64'
const getwxConfig = async () => {
  let url = 'http://testcarapi.hileader.com/wechat/wechat_login/getSign'
  // const service = axios.create({
  //   // baseURL:config.baseURL,
  //   baseURL: 'http://testcarapi.hileader.com',
  //   timeout: 6000 // 请求超时时间
  // })
    const res  = await axios.post('/api/wechat/wechat_login/getSign', {url: url})
    wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.data.appId, // 必填，公众号的唯一标识
    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    signature: res.data.data.signature,// 必填，签名
    jsApiList: ['chooseImage', 'uploadImage',] // 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
  })
    // window.location.replace(res.data.data.sq_url)
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a7349110b94fea1&redirect_uri=http%3A%2F%2Ftestcarapi.hileader.com%2Fwechat%2Fwechat_login%2FgetSign&response_type=code&scope=snsapi_userinfo&state=lide#wechat_redirect
    let code = '081FzkaF0jod7f2AIMcF0FLeaF0FzkaY'
    // localStorage.setItem('code', code)
    const _res = await axios.post('api/wechat/wechat_login/login', {code: code})
    console.log(_res.data.data.openid)
    localStorage.setItem('code', base64.encode(_res.data.data.openid))
    localStorage.setItem('user_info',JSON.stringify(_res.data.data))

}


export default getwxConfig
