import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods.vue'
import seller from '../components/seller.vue'
import ratings from '../components/ratings.vue'
Vue.use(Router)
// 创建路由
export default new Router({
  routes: [
    {path: '/', redirect: '/goods'},
    {path: '/goods', component: goods},
    {path: '/seller', component: seller},
    {path: '/ratings', component: ratings},
    {path: '/*', redirect: '/'}
  ]
})
