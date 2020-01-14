import req from '../https';

// 积分录入
export  const addPoint = params =>req('post','/point/add',params);

