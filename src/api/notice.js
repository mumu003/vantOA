import req from '../https';

//查询公告
export  const findnotice = params =>req('get','/notice/findAll',{});

//更改公告
export const updatenotice = params=>req('post','/notice/update',params)

//删除公告
export const deletenotice = params=>req('delete','/notice/delete',params)

