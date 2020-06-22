import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routers = [
    {
        path: '/',
        name: 'addInfo',
        component:() => import('../view/AddInfo'),
        meta: {
            title: " 预录入"
        },
    },
    {
        path:'/carList',
        name:'carList',
        component:() => import('../view/CarList'),
        meta: {
            title: "车辆列表"
        },
    }

]
export default new Router({
    mode: 'hash',
    routes: routers
})
