import req from '../https';

//发布任务
export  const addTask = params =>req('post','/task/add',params);

