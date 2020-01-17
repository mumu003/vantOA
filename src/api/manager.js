import req from '../https';

//查询公告
export  const findnotice = params =>req('get','/notice/findAll',{});

//更改公告
export const updatenotice = params=>req('post','/notice/update',params)

//删除公告
export const deletenotice = params=>req('delete','/notice/delete',params)

// 发布公告
export const addnotice = params=>req('post','/notice/add',params)

// 积分规则列表(规则名称可选)
export const findByName = params=>req('get','/rules/findByName',params)

// 积分规则列表(根据规则类型)
export const findByType = params=>req('get','/rules/findByType',params)

// 修改规则
export const updateRules = params=>req('put','/rules/update ',params)

// 新增规则
export const addRules = params=>req('post','/rules/add',params)

// 删除规则
export const deleteRules = params=>req('delete','/rules/delete',params)

// 获取规则类型
export const findAll = params=>req('get','/rulesType/findAll',params)

// 新增规则类型
export const addRulesType = params=>req('post','/rulesType/add',params)

// 修改规则类型
export const updateRulesType = params=>req('put','/rulesType/update',params)

// 删除规则类型
export const deleteRulesType = params=>req('delete','/rulesType/delete',params)

// 任务大厅(员工端)
export const findByEmpl = params=>req('get','/task/findByEmpl',params)

// 员工管理-查看所有用户
export const findList = params=>req('get','/employees/findList',params)

// 修改员工部门
export const updateEmployeesDept = params=>req('put','/employees/updateEmployeesDept',params)

// 修改员工角色
export const updateEmployeesRole = params=>req('put','/employees/updateEmployeesRole',params)

// 删除员工
export const deleteEmployees = params=>req('delete','/employees/delete',params)

// 重置密码
export const resetPwd = params=>req('put','/employees/resetpwd',params)

// 新增员工
export const addEmployees = params=>req('post','/employees/add',params)

