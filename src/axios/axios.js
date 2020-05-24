import Vue from 'vue'
import axios from 'axios'
import {mutations} from './simpleStore'

// Vue.use(message)
// 创建 axios 实例
const VueAxios = {
    vm: {},
    // eslint-disable-next-line no-unused-vars
    install(Vue, instance) {
        if (this.installed) {
            return
        }
        this.installed = true

        if (!instance) {
            // eslint-disable-next-line no-console
            console.error('You have to install axios')
            return
        }

        Vue.axios = instance

        Object.defineProperties(Vue.prototype, {
            axios: {
                get: function get() {
                    return instance
                }
            },
            $http: {
                get: function get() {
                    return instance
                }
            }
        })
    }
}


const service = axios.create({

    // baseURL:config.baseURL,
    // baseURL: 'http://testcarapi.hileader.com',
    // timeout: 6000 // 请求超时时间
})

const err = (error) => {
    // console.log(error, '拦截器')

    return Promise.reject(error)
}

// request interceptor拦截器
service.interceptors.request.use(config => {
    // console.log(mutations.getToken(),'拦截器获取token')

    if (mutations.getCode()) {
        config.headers['Authorization'] = mutations.getCode() // 让每个请求携带自定义 token 请根据实际情况自行修改
    }

    return config
}, err)

// response interceptor拦截器
service.interceptors.response.use((response) => {
    return response.data
}, err)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}
