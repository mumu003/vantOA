import req from '../https';

//查询规则类别
export  const getruletype = params =>req('get','/rulesType/findAll',{});

//查询积分规则
export const getrule = params=>req('get','/rules/findByType',params)

//积分申请
export const applyempl = params=>req('post','/point/applyempl',params)

//查询审批人
export const findautior = params=>req('get','/employees/findListByAuditor',params)

// 积分事件
export const findPointEvent = params =>req('get','/point/findPointEvent',params);

// 积分录入
export const addPoint = params =>req('post','/point/add',params);

// 管理员和超管--审批待审核列表
export const findPointWait = params =>req('get','/point/findPointWait',params);

// 管理员和超管--审批通过列表
export const findPointPass = params =>req('get','/point/findPointPass',params);

// 管理员和超管--审批未通过列表
export const findPointDisagree = params =>req('get','/point/findPointDisagree',params);

//管理员和员工查看审批状态等待审批
export const findPointWaitByEmpl = params =>req('get','/point/findPointWaitByEmpl',params);

//管理员和员工查看审批状态已通过
export const findPointPassByEmpl = params =>req('get','/point/findPointPassByEmpl',params);

//管理员和员工查看审批状态未通过
export const findPointDisagreeByEmpl = params =>req('get','/point/findPointDisagreeByEmpl',params);

// 审核通过
export const passPoint = params =>req('post','/point/passPoint',params);

// 审核不通过
export const pointDisagree = params =>req('post','/point/pointDisagree',params);

// 普通员积分排行
export const getRank = params =>req('get','/point/emplrank',params);

// 删除审批申请信息
export const deletePoint = params =>req('delete','/point/delete',params);
