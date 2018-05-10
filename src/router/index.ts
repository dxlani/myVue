import Vue from 'vue'
import Router from 'vue-router'

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
        name: 'demo'
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
      meta:{title: '登录',requireAuth: true},
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
  //  判断是否需要登录权限 以及是否登录
     if (to.meta.requireAuth) {// 判断是否需要登录权限
      if (store.state.token) {// 判断是否登录
        console.log('1');
        next()
      } else {
        //  router.push('./login')
         next({
           path: '/login',
           query: {redirect: to.fullPath}
        })
        console.log('2');
        
     }
    } else {
       next()
      console.log('3');
      
    }
      //路由钩子改标题
    if(to.meta.title){
      document.title = to.meta.title
    }
   })



export default router


