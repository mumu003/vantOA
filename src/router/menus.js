
export default [
    {
      path: '/organization',
      name: '组织架构',
      component: () => import('@/views/Management/organization.vue'),
      meta: {
        id: 0,
        type:1,
        name: '组织架构',
        manageShow:false,
        requireAuth:true,
        img:'img0',
        roleIds:[1],
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
        manageShow:false,
        requireAuth:true,
        img:'img1',
        roleIds:[1,2],
      },
    },{
      path: '/notice',
      name: '通知公告',
      component: () => import('@/views/Management/notice.vue'),
      meta: {
        id: 2,
        type:1,
        name: '通知公告',
        manageShow:false,
        requireAuth:true,
        img:'img2',
        roleIds:[1,2,3],
      },
    },{
      path: '/pointRule',
      name: '积分规则',
      component: () => import('@/views/Management/pointRule.vue'),
      meta: {
        id: 3,
        type:1,
        name: '积分规则',
        manageShow:false,
        requireAuth:true,
        img:'img3',
        roleIds:[1,2],
      },
    },{
      path: '/taskManage',
      name: '任务管理',
      component: () => import('@/views/Admin/taskManage.vue'),
      meta: {
        id: 4,
        type:1,
        name: '任务管理',
        manageShow:false,
        requireAuth:true,
        img:'img4',
        roleIds:[1,2],
      },
    },
    // {
    //   path: '/task',
    //   name: '任务管理',
    //   component: () => import('@/views/Management/task.vue'),
    //   meta: {
    //     id: 4,
    //     type:1,
    //     name: '发布任务',
    //     manageShow:false,
    //     requireAuth:true,
    //     img:'img4',
    //   },
    // },
    {
      path: '/taskRoom',
      name: '任务大厅',
      component: () => import('@/views/Management/taskRoom.vue'),
      meta: {
        id: 5,
        type:1,
        name: '任务大厅',
        manageShow:false,
        requireAuth:true,
        img:'img5',
        roleIds:[2,3],
      },
    },{
      path: '/pointEvent',
      name: '积分事件',
      component: () => import('@/views/Management/pointEvent.vue'),
      meta: {
        id: 6,
        type:2,
        name: '积分事件',
        img:'img6',
        requireAuth:true,
        manageShow:false,
        roleIds:[1,2,3],
      },
    },{
      path: '/pointEntry',
      name: '积分录入',
      component: () => import('@/views/Management/pointEntry.vue'),
      meta: {
        id: 7,
        type:2,
        name: '积分录入',
        img:'img7',
        requireAuth:true,
        manageShow:false,
        roleIds:[1,2],
      },
    },{
      path: '/pointRank',
      name: '积分排名',
      component: () => import('@/views/Management/pointRank.vue'),
      meta: {
        id: 8,
        type:2,
        name: '积分排名',
        img:'img8',
        requireAuth:true,
        manageShow:false,
        roleIds:[1,2,3],
      },
    },{
      path: '/integral',
      name: '积分申请',
      component: () => import('@/views/Management/integral.vue'),
      meta: {
        id: 8,
        type:2,
        name: '积分申请',
        img:'img7',
        requireAuth:true,
        manageShow:false,
        roleIds:[2,3],
      },
    },{
      path: '/staff',
      name: '员工管理',
      component: () => import('@/views/Management/staff.vue'),
      meta: {
        id: 9,
        type:2,
        name: '员工管理',
        img:'img9',
        requireAuth:true,
        manageShow:false,
        roleIds:[1,2],
      },
    },{
      path: '/viewApproval',
      name: '审批查看',
      component: () => import('@/views/Management/approval.vue'),
      meta: {
        id: 10,
        type:2,
        name: '审批查看',
        img:'img10',
        requireAuth:true,
        manageShow:false,
        roleIds:[2,3],
      },
    }
    
  ]

