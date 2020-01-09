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



// 获取规则类型
export const findAll = params=>req('get','/rulesType/findAll',params)
