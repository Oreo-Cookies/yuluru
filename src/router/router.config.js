import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routers = [
    {
        path: '/',
        redirect: '/addInfo',
    },
    {
        path:'/addInfo',
        name:'addInfo',
        component:() => import('../view/AddInfo')
    }

]
export default new Router({

    mode: 'hash',

    routes: routers
})
