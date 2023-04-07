
// 解析url 参数
// 提取参数： key, value
// 判断val是否为空
// 将val转化为数字
// 判断该key是否多次出现

function parseUrl(url){
    // 将 ？ 后面的内容提取出来
    let params = url.split('?')[1]

    let paramsArr = params.split('&')
    let res = {}

    paramsArr.forEach((e) => {
        let [key, val] = e.split('=')
        if(val !== undefined){
            // 解码
            val = decodeURIComponent(val)
            // 能转化为数字就转化为数字
            // 检查是否符合全是数字的模式
            val = /^\d+$/.test(val) ? parseFloat(val): val

            if(res.hasOwnProperty(key)){
                let prev = res[key]  
                res[key] = [prev, val]
            }else{
                res[key] = val
            }
        }else{
            res[key] = true
        }
    })

    return res
}


let url  = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'

console.log(parseUrl(url));
