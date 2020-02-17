function formdatatime(val,type,ishour){
    
// if (val) {
//     //默认以 - - -的形式展示
//     type?'':type='-';
    
//     let date = new Date(val);
//     let year = date.getFullYear();
//     let month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
//     let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
//     let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
//     let minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
//     let scen = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
//     //是否只显年月日
//     if(ishour){
//         return year + type + month + type + day 
//     }
//     else{
//     return year + type + month + type + day + ' ' + hour + ':' + minute 
//     }
// } else {
//     return '不支持显示'
// }
    var dateee = new Date(val).toJSON();
    console.log(new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') )
    var a=new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') ;
    
    var u = navigator.userAgent;
    //Android终端
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    //iOS终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if(isiOS){
        //如果为iOS
        a = a.replace(/-/g, '/');
    }
    return a
}

function formatDate(val,type,ishour){
    
    if (val) {
        //默认以 - - -的形式展示
        type?'':type='-';
        
        let date = new Date(val);
        let year = date.getFullYear();
        let month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
        //是否只显年月日
        if(ishour){
            return year + type + month + type + day 
        }
        else{
        return year + type + month + type + day
        }
    } else {
        return '不支持显示'
    }
    }
export {
    formdatatime,formatDate
}