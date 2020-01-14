import req from '../https';

//查询规则类别
export  const getruletype = params =>req('get','/rulesType/findAll',{});

//查询积分规则
export const getrule = params=>req('get','/rules/findByType',params)

//积分申请
export const applyempl = params=>req('post','/point/applyempl',params)

//查询审批人
export const findautior = params=>req('get','/employees/findListByAuditor',params)


