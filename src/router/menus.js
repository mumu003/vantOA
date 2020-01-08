
export default [
    {
      path: '/organization',
      name: '组织架构',
      component: () => import('@/views/Management/organization.vue'),
      meta: {
        id: 0,
        name: '组织架构',
        manageShow:false
      },
    },
    {
      path: '/issue',
      name: '发布通知',
      component: () => import('@/views/Management/issue.vue'),
      meta: {
        id: 1,
        name: '发布通知',
        manageShow:false
      },
    },{
      path: '/task',
      name: '发布任务',
      component: () => import('@/views/Management/task.vue'),
      meta: {
        id: 2,
        name: '发布任务',
        manageShow:false
      },
    },
    
  ]

