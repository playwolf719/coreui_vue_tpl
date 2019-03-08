import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import TaskCreate from '@/view/task/Create1'
import TaskList from '@/view/task/List'
import MyTaskList from '@/view/task/MyList'
import JobCreate  from '@/view/job/Create'
import JobList  from '@/view/job/List'
import JobDoneList  from '@/view/job/DoneList'
import JobUserDoneList  from '@/view/job/UserDoneList'
import Login from '@/view/page/Login'
import Register from '@/view/page/Register'
import mycommon from '@/lib/mycommon.js'

const DefaultContainer = () => import('@/containers/DefaultContainer')



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: '',
      component: DefaultContainer,
      children: [
        {
          path: '/index',
          name: '首页',
          component: Index,
        },
        {
          path: '/task',
          redirect: '/task/list',
          name: '任务',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              //create前不得加/
              path: 'create',
              name: '任务发布',
              component: TaskCreate
            },
            {
              path: 'list',
              name: '公共任务列表',
              component: TaskList
            },
            {
              path: 'mylist',
              name: '我的任务列表',
              component: MyTaskList
            },
          ]
        },
        {
          path: '/job',
          redirect: '/job/list',
          name: '工作',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'create',
              name: '做任务',
              component: JobCreate
            },
            {
              path: 'list',
              name: '我的工作列表',
              component: JobList
            },
            {
              path: 'done_list',
              name: '工作完成情况',
              component: JobDoneList
            },
            {
              path: 'user_done_list',
              name: '用户工作完成情况',
              component: JobUserDoneList
            },
          ]
        }
      ]
    },
    {
      name: 'page',
      path: '/page',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          name: '登陆',
          path: 'login',
          component: Login
        },
        {
          name: '注册',
          path: 'register',
          component: Register
        },
        // {
        //   name: 'Error 404',
        //   path: '/404',
        //   icon: 'icon-star'
        // },
        // {
        //   name: 'Error 500',
        //   path: '/500',
        //   icon: 'icon-star'
        // }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
    var token = mycommon.getCookie('token')
    console.log("token",token)
    if (!token) {
      if (['/page/login',"/page/register"].indexOf(to.path) < 0) {
            return next({path: '/page/login'});
        }else {
            next();
        }
    }else {
        if (to.path === '/page/login') {
            return next({path: '/'});
        }
        next();
    }
});

export default router;
