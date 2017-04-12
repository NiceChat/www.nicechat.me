/**
 * saas-web 配置文件
 * test环境和dev环境基本相同唯一区别在与访问接口路径不一致
 */
export default {
  // app名字
  appName: 'YangLei`s Notes',
  // 版本号
  ver: '1.0',
  // 开发环境访问域名 http://server.nicechat.com/api/getBlogList
  devHostName: 'http://server.nicechat.com',
  // 生产环境访问域名
  proHostName: 'http://server.nicechat.me',
  // 前端模拟数据是否开启
  mock: false,
  // 系统统一处理errorCode
  errorCodeArr: [404, 502, 500, 99999],
  errorHandler: {
    99999 (store) {
      store.dispatch('RESETUSER')
      window.location.href = '/#/login'
    }
  }
}
