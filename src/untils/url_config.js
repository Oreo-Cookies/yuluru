// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'http://testcarapi.hileader.com',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: '/api',    //vue.config.js文件中的本地代理路径
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: '/api',
    authBaseURL: ''
  }
}
console.log(modeUrlObj[process.env.NODE_ENV],process.env.NODE_ENV,'环境路径')
export default modeUrlObj[process.env.NODE_ENV]
