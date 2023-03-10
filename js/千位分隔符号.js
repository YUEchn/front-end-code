

function format(args){
    let argsStr = args.toString().split('.')
    let argsStr1 = argsStr[0].split('').reverse()
    let argsStr2 = argsStr[1] === undefined ? '':  '.' + argsStr[1]

    let s1 = []
    argsStr1.forEach((e, i) => {
        if(i%3 === 0 && i !== 0){
            s1.push(',', e)
        }else{
            s1.push(e)
        }
    })
    s1 = s1.reverse().join('') + argsStr2
    return s1
}

console.log(format(1234567.4587));
console.log(format(1234567));


// 使用正则表达式方法
/*
    \B: 非单词边界的都可以被匹配到，匹配的是位置
    (?=)：先行断言
        (\d{3})+：匹配1个或1个以上括号里的内容，也就是三个数字构成的一串字符
    (?!\d)：后行断言， （3的倍数个数字）之后不能再有数字了
    (?<!y)x：反否定查找，仅仅当前面不是 y 时匹配 x 

*/
function format2(args){
    return args.toString().replace(/(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g, ',')
}
console.log(format2(1234567.4587));
console.log(format2(1234567));



