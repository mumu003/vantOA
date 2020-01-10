
export default [
    {
      path: '/organization',
      name: '组织架构',
      component: () => import('@/views/Management/organization.vue'),
      meta: {
        id: 0,
        name: '组织架构',
        manageShow:false,
        requireAuth:true
      },
    },
    {
      path: '/issue',
      name: '发布公告',
      component: () => import('@/views/Management/issue.vue'),
      meta: {
        id: 1,
        name: '发布公告',
        manageShow:false,
        requireAuth:true
      },
    },{
      path: '/notice',
      name: '通知公告',
      component: () => import('@/views/Management/notice.vue'),
      meta: {
        id: 2,
        name: '通知公告',
        manageShow:false,
        requireAuth:true
      },
    },{
      path: '/pointRule',
      name: '积分规则',
      component: () => import('@/views/Management/pointRule.vue'),
      meta: {
        id: 3,
        name: '积分规则',
        manageShow:false,
        requireAuth:true
      },
    },{
      path: '/task',
      name: '发布任务',
      component: () => import('@/views/Management/task.vue'),
      meta: {
        id: 4,
        name: '发布任务',
        manageShow:false,
        requireAuth:true
      },
    },
    
  ]

