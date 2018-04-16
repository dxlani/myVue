import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/login.ts'
import test from '../views/test/test.ts'
import demo from '../views/demo/demo.ts'


Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: demo,
      meta:{title: 'demo'},
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      meta:{title: 'demo'},
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{title: '登录'},
      /* 路由内钩子 */
      beforeEnter: function(to:any,from:any,next:any){
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
      component:test,
      // meta:{title: '测试'},
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: { 
          requireAuth: false
        },
      //    component: (resolve) => {
      //     require(['../components/test/test'], resolve)
      //  }
      
    }
  ],
    mode:'history'   //去#号
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