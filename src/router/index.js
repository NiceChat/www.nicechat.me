  import Vue from 'vue'
import Router from 'vue-router'
// 404 page
import NotFoundComponent from 'components/Common/NotFoundComponent.vue'
import Index from 'components/Index'
import Login from 'components/Login'
import Editor from 'components/Editor'
import Info from 'components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {path: '/home', alias: '/', component: Index},
    // 登录页面，个人中心
    {path: '/login', component: Login},
    {path: '/editor', component: Editor},
    {path: '/info', component: Info},
    // 404 页面
    {path: '*', component: NotFoundComponent}
  ]
})
