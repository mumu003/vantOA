import req from '../https';

//任务列表(管理员)
export  const findByAdmin = params =>req('get','/task/findByAdmin',{});

// 更新任务状态
export const updateStatus = params=>req('post','/task/updateStatus',params);

// 删除任务
export const deleteTasks = params=>req('delete','/task/delete',params);

// 修改任务标题
export const updateTitle = params=>req('put','/task/updateTitle',params);

// 修改任务内容
export const updateContent = params=>req('put','/task/updateContent',params);

// 超级管理员（各部门统计）
export const findAdminData = params=>req('get','/employees/findAdmin',params);