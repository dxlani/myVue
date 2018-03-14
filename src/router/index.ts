import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/login.ts'
import test from '../views/test/test.ts'

// var login = require ()

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{title: '登录'},
      /* 路由内钩子 */
      beforeEnter: function(to,from,next){
        if(to.meta.title){
          document.title = to.meta.title
        }else{
            document.title = '路由'
        }
        next()
    }
    },
    {
      path: '/test',
      name: 'test',
      /* 路由内钩子 */
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: { 
          requireAuth: true
        },
         component: (resolve) => {
          require(['../components/luck28/Luck'], resolve)
       }
    }
  ]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
     if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
      if (localStorage.getItem('username')) {// 判断是否登录
        next()
      } else {// 没登录则跳转到登录界面
         next({
           path: '/login',
         query: {redirect: to.fullPath}
        })
     }
    } else {
      next()
    }
   })


export default router