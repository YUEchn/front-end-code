const time = {
    year: 2021,
    month: 7,
    y: undefined,
    yy: null,
    yyy: Symbol(),
    day: {
        value: 1,
        fn: function(){}
    },
    data: {
        v1: [undefined, undefined],
        v2: 1,
    },
};

// 【JSON.stringify】
// 原理：将js对象序列化（将对象的状态信息转换为可以存储或传输的形式的过程，转为字符串形式），再通过JSON.parse反序列化
// 不足：拷贝的对象中如果有【function】，【undefined】，【symbol】会被转化为null，当使用过JSON.stringify()进行处理之后，都会消失。
let t1 = JSON.parse(JSON.stringify(time))
/*
    {
        year: 2021,
        month: 7,
        yy: null,
        day: { value: 1 },
        data: { v1: [ null, null ], v2: 1 }
    }

*/
console.log(time, t1);

// 【lodash的cloneDeep】
/*

var _ = require('lodash)

var t2 = _.cloneDeep(time)
*/


//自定义递归实现深拷贝
console.log(`***************************自定义递归实现深拷贝**********************`)
function deepClone(obj){
    if(!obj || typeof obj !== 'object') return

    let targetObj  = Array.isArray(obj)? []: {}

    for(let item in obj){
        if(obj.hasOwnProperty(item)){
            if(typeof obj[item] === 'object'){
                targetObj[item] = deepClone(obj[item])
            }else{
                targetObj[item] = obj[item]
            }
        }
    }

    return targetObj
}


let t3 = deepClone(time)
console.log(t3);
let t4 = deepClone([1,2,3,4]);
console.log(t4);
