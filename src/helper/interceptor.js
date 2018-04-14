import Vue from 'vue'
import Config from './config'
import { MessageBox } from 'element-ui'

export const Interceptor = () => {
  // 避免请求多次发送
  let frozenUrl = {}

  Vue.http.options.emulateJSON = true

  Vue.http.interceptors.push(function (request, next) {
    // 请求url处理
    if (process.env.NODE_ENV === 'development') {
      // 本地开发环境
      request.url = Config.devHostName + request.url
    } else {
      // 线上环境地址
      request.url = Config.proHostName + request.url
    }

    if (frozenUrl[ request.url ]) return false

    frozenUrl[ request.url ] = true

    next((response) => {
      let res = response.body
      let code = res.code
      frozenUrl[ request.url ] = false


      if (!response.ok) {
        MessageBox.alert('网络或者其它原因导致数据接口拉取失败！请重试。')
      } else if (Config.errorCodeArr.indexOf(code) !== -1) {
        Config.errorHandler[code] && Config.errorHandler[code](this.$store)
        !Config.errorHandler[code] && MessageBox.alert('网络或者其它原因导致数据接口拉取失败！请重试。', code)
      }
    })
  })
}
