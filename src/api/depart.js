import req from '../https';

//获取所有部门
export  const findAlldepart = params =>req('get','/depart/findAll',params);

//查询目录下所有员工
export const findAllList = params=>req('get','/employees/findList',params);

//添加部门
export const adddepart = params=>req('post','/depart/add',params);

//修改部门
export const updatedepart = params=>req('put','/depart/update',params);

//删除部门
export const deletedepart = params=>req('delete','/depart/delete',params);
