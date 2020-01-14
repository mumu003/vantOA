import req from '../https';

//任务列表(管理员)
export  const findByAdmin = params =>req('get','/task/findByAdmin',{});
