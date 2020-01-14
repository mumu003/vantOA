import req from '../https';

//登陆
export  const login = params =>req('post','/login',params);

//退出
export const logout = params =>req('post','logout',params);

// 修改名称
export const updatename = params =>req('post','/employees/updatename',params);

// 修改手机号
export const updatephone = params =>req('post','/employees/updatephone',params);

// 修改密码
export const updatepwd = params =>req('post','/employees/updatepwd',params);