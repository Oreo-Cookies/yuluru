import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routers = [
    {
        path: '/',
        name: 'addInfo',
        component:() => import('../view/AddInfo')
    },
    {
        path:'/carList',
        name:'carList',
        component:() => import('../view/CarList')
    }

]
export default new Router({
    mode: 'hash',
    routes: routers
})
