import router from './router/router.config'
import getwxConfig from "./untils/wx.config";

router.beforeEach((to, from, next) => {
    // console.log(to, from, next, '路由跳转')

    if (to.name === 'addInfo') {
        let code = localStorage.getItem('code')
        console.log(code)
        if (!code) {
            getwxConfig()
        }
        next()
    }


})
