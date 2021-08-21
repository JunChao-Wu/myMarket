import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Goods from '../components/Goods.vue'
import Purchase from '../components/Purchase.vue';
import Category from '../components/z_category/Category.vue';
import Setting from '../components/z_settings/Setting.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/index/setting'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {path: 'goods', component: Goods},
      {path: 'purchase', component: Purchase},
      {path: 'category', component: Category},
      // {path: 'setting', name: 'Setting', component: () => import('../components/z_settings/Setting.vue')},
      {path: 'setting', component: Setting}
      // {path: '', component: ''}
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',/* 绑定激活routerlink样式为各自的active类名 */
  routes
})

export default router
