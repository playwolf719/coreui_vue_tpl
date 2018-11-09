export default {
  items: [
    {
      name: '首页',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        // variant: 'primary',
        // text: 'NEW'
      }
    },
    {
      name: '任务',
      url: '/task',
      icon: 'icon-puzzle',
      children: [
        {
          name: '任务发布',
          url: '/task/create',
          icon: 'icon-cursor'
        },
        {
          name: '任务列表',
          url: '/task/list',
          icon: 'icon-list',
        }
        ]
    }
  ]
}
