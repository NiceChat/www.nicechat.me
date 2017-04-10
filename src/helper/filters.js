/**
 * 全局过滤函数
 */
import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn');

Vue.filter('calendar', (val) => {
  return moment.unix(val).calendar()
})

Vue.filter('format', (val) => {
  return moment.unix(val).format("YYYY-MM-DD hh:mm:ss")
})