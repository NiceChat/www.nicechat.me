/**
 * saas-web 配置文件
 * test环境和dev环境基本相同唯一区别在与访问接口路径不一致
 */
export default {
  // app名字
  appName: '合募PC',
  // 版本号
  ver: '1.0',
  // 开发环境访问域名 http://server.nicechat.com/api/getBlogList
  devHostName: 'http://server.nicechat.com',
  // 生产环境访问域名
  proHostName: 'http://web.fincgo.com:8000',
  // 前端模拟数据是否开启
  mock: false,
  staticBgPath: [
    '/Public/uploads/webbackgroundimg/1.png',
    '/Public/uploads/webbackgroundimg/2.png',
    '/Public/uploads/webbackgroundimg/3.png',
    '/Public/uploads/webbackgroundimg/4.png',
    '/Public/uploads/webbackgroundimg/5.png',
    '/Public/uploads/webbackgroundimg/6.png',
    '/Public/uploads/webbackgroundimg/7.png',
    '/Public/uploads/webbackgroundimg/8.png',
    '/Public/uploads/webbackgroundimg/9.png',
    '/Public/uploads/webbackgroundimg/10.png'],
  // 系统统一处理errorCode
  errorCodeArr: [404, 502, 500, 99999],
  errorHandler: {
    99999 (store) {
      store.dispatch('RESETUSER')
      window.location.href = '/#/login'
    }
  }
}
