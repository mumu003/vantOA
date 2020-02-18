function formtime(val,type,ishour){
    
if (val) {
    //默认以 - - -的形式展示
    type?'':type='-';
    
    let date = new Date(val);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    let minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    let scen = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    //是否只显年月日
    if(ishour){
        return year + type + month + type + day 
    }
    else{
    return year + type + month + type + day + ' ' + hour + ':' + minute + ':' +scen
    }
} else {
    return '不支持显示'
}
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

    const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
    function formdatatimeSQ(val, format)  {
       if (val) {
           /**
            * @instructions 如果不是时间戳格式，且含有字符 '-' 则将 '-' 替换成 '/' && 删除小数点及后面的数字
            * @reason 将 '-' 替换成 '/' && 删除小数点及后面的数字 的原因是safari浏览器仅支持 '/' 隔开的时间格式
            */
           if (val.toString().indexOf('-') > 0) {
               val = val.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/') // 将 '-' 替换成 '/'
               val = val.slice(0, val.indexOf('.')) // 删除小数点及后面的数字
           }
           let date = new Date(val)
           date.setHours(date.getHours() + 8)
           
           
            var a =new Date(date)
            const [whole, yy, MM, dd, hh, mm, ss] = a.toISOString().match(REGEX)
           
            let year = date.getFullYear();
            let month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
            let dates = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
            let minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
            let second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();

           if (format) {
               return format
                   .replace('yyyy', yy)
                   .replace('yy', yy.slice(2))
                   .replace('MM', MM)
                   .replace('dd', dd)
                   .replace('hh', hh)
                   .replace('mm', mm)
                   .replace('ss', ss)
           } else {
               return [year, month, dates].join('/') + ' ' + [hour, minute, second].join(':')
           }
       } else {
           return '--'
       }
   }
      
      
export {
    formdatatimeSQ,formatDate,formtime
}