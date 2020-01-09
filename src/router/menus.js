
export default [
    {
      path: '/organization',
      name: '组织架构',
      component: () => import('@/views/Management/organization.vue'),
      meta: {
        id: 0,
        type:1,
        name: '组织架构',
        img:'img0',
        manageShow:false
      },
    },
    {
      path: '/issue',
      name: '发布公告',
      component: () => import('@/views/Management/issue.vue'),
      meta: {
        id: 1,
        type:1,
        name: '发布公告',
        img:'img1',
        manageShow:false
      },
    },{
      path: '/notice',
      name: '通知公告',
      component: () => import('@/views/Management/notice.vue'),
      meta: {
        id: 2,
        type:1,
        name: '通知公告',
        img:'img2',
        manageShow:false
      },
    },{
      path: '/pointRule',
      name: '积分规则',
      component: () => import('@/views/Management/pointRule.vue'),
      meta: {
        id: 3,
        type:1,
        name: '积分规则',
        img:'img3',
        manageShow:false
      },
    },{
      path: '/task',
      name: '发布任务',
      component: () => import('@/views/Management/task.vue'),
      meta: {
        id: 4,
        type:1,
        name: '发布任务',
        img:'img4',
        manageShow:false
      },
    },{
      path: '/pointEntry',
      name: '积分录入',
      component: () => import('@/views/Management/pointEntry.vue'),
      meta: {
        id: 5,
        type:2,
        name: '积分录入',
        img:'img7',
        manageShow:false
      },
    },
    
  ]

