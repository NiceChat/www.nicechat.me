/**
 * 配置文件
 */
export default {
  // app名字
  appName: 'YangLei`s Notes',
  // 版本号
  ver: 'v1.0.1',
  devHostName: 'http://dev.server.leileissr.com',
  // 生产环境访问域名
  proHostName: 'http://server.leileissr.cn',
  // 前端模拟数据是否开启
  mock: false,
  // 系统统一处理errorCode
  errorCodeArr: [404, 502, 500, 99999],
  // 七牛图片服务上传地址
  qiniu: {
    access_key: 'mBX2BAcEFBL4lf3eN6TJz9WERagFZc3pprQPe1nO',
    secret_key: 'IlQgBy1TdR12ap4yObvmp0bRyGAPoIevEpxX8XB3',
    url: 'http://oucfav3vt.bkt.clouddn.com',
    uploadUrl: 'up-z2.qiniu.com',
    // 水印在七牛的后台设置样式名称
    style: 'watermarked.jpg'
  },
  errorHandler: {
    99999 (store) {
      store.dispatch('RESETUSER')
      window.location.href = '/#/login'
    }
  }
}
