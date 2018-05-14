import Vue from 'vue'
import Router from 'vue-router'

import hello from '../views/hello'
import okay from '../views/okay'
import demo from '../views/demo'
import test from '../views/test'
import other from '../views/other'

import store from '../vuex/store'

import login from '../views/login'
import app from '../components/app'
import HomeComponent from '../views/home'
import InquiryReleaseManageComponent from '../views/inquiryReleaseManage'
declare var $:any;
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
      path: '/login',
      name:'login',
      component: login,
      meta:{title: 'login',requireAuth: false},
    },
    {
      path:'/app',
      component: app,
      children:[
        {
          path: '',
          component: HomeComponent,
          // meta:{title: 'HomeComponent',requireAuth: true},
        },
        {
          path: 'home',
          component: HomeComponent,
          // meta:{title: 'HomeComponent',requireAuth: true},
        },
        {
          path: 'inquiry/inquiryReleaseManage',
          component: InquiryReleaseManageComponent,
        },
        {
          path: 'demo',
          component: demo,
        },
        {
          path: 'hello',
          component: hello,
        },
        {
          path: 'okay',
          component:okay,
          children: [
            {
              path: '',
              component: test
            },
            {
              path: 'other',
              component: other
            },
            {
              path: 'test',
              component: test
            } 
          ],
        }
      ]
    }
  ],
     // mode:'history'   //去#号 需要服务器支持
      mode:'hash'   //默认
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  store.state.token=token;
        //判断是否需要登录权限 以及是否登录
        if (!store.state.token && to.path !== '/login') {// 判断是否登录
          next({
            path: '/login',
        })
        } else {
          next()
          }
          //路由钩子改标题
        if(to.meta.title){
          document.title = to.meta.title
        }
        //登录页加背景图
        if(to.path=="/login"){
         $('body').addClass('body-bg')
        }else{
          $('body').removeClass('body-bg')
        }
   })

export default router


