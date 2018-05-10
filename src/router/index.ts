import Vue from 'vue'
import Router from 'vue-router'

import hello from '../views/hello'
import login from '../views/login'
import okay from '../views/okay'
import demo from '../views/demo'
import test from '../views/test'
import other from '../views/other'
import store from '../vuex/store'
Vue.use(Router)


 const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
    }
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      meta:{title: 'demo',requireAuth: true},
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{title: 'login',requireAuth: false},
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello,
      meta:{title: 'hello',requireAuth: true},
    },
    {
      path: '/okay',
      name: 'okay',
      component:okay,
      meta:{title: 'okay',requireAuth: true},
      // 需要登录才能进入的页面可以增加一个meta属性
      children: [
        // {
        //   path: '/',
        //   component: test
        // },
        {
          path: 'other',
          name: 'other',
          component: other
        },
        {
          path: 'test',
          name: 'test',
          component: test
        } 
      ],
    }
  ],
     // mode:'history'   //去#号 需要服务器支持
      mode:'hash'   //默认
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  store.commit('SET_TOKEN', token);
  //  判断是否需要登录权限 以及是否登录
     if (to.meta.requireAuth) {// 判断是否需要登录权限
      if (!store.state.token && to.path !== '/login') {// 判断是否登录
        next({
          path: '/login',
       })
       } else {
        next()
        }
     } else {
          next()
        }
          //路由钩子改标题
        if(to.meta.title){
          document.title = to.meta.title
        }
   })

export default router


