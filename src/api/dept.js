import req from '../https';

//根据部门名称查询
export  const findAll = params =>req('get','/depart/findAll',{});

// 查询所有用户
export  const findList = params =>req('get','/employees/findList',params);