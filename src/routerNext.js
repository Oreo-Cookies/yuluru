import router from './router/router.config'
import getwxConfig from "./untils/wx.config";

router.beforeEach(async (to, from, next) => {
    // console.log(to, from, next, '路由跳转')
    console.log(to)
    if (to.name === 'addInfo' || to.name === 'carList') {
        let code = localStorage.getItem('code')
        if (!code) {
            console.log('缺少token')
            await getwxConfig()
            next()
        } else {
            next()
        }
    }


})
