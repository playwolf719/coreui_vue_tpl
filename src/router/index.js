import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Index1 from '@/components/Index1'
import TaskCreate from '@/view/task/Create'

const DefaultContainer = () => import('@/containers/DefaultContainer')



Vue.use(Router)

export default new Router({
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
              path: 'create',
              name: '任务发布',
              component: TaskCreate
            },
            {
              path: 'list',
              name: '任务列表',
              component: Index1
            },
          ]
        },
      ]
    }
  ]
})
