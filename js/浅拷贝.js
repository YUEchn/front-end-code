
// 【Object.assign】
/*
    接受多个参数，第一个参数是要目标对象，其余的是源对象 
特点：
    浅拷贝；
    同名属性覆盖；
    取值函数处理（取到函数的返回值，而不是函数本身）;
    第一个参数不能为null或 undefined，会报错，当参数不是Object的时候，会转换为Object
*/


// 在Object上面定义了一个方法
console.log(`***************************Object.assign**********************`)

Object.myAssign = function(target, ...source) {
        if (target == null || target == undefined) { 
            throw new TypeError('Cannot convert undefined or null to object');
        }
    
        // 会执行自动转object的操作
        var to = Object(target);
        source.forEach((obj) => {
            if(obj !== null){
                for(let key in obj){
                    if(obj.hasOwnProperty(key)){
                        to[key] = obj[key]
                    }
                }
            }
        })
        return to;
    }

  // 测试用例
let a = {
    name: "advanced",
    age: 18
}
let b = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    }
}

let c = Object.myAssign(a, b);
console.log(c);


// 【扩展运算符】
console.log(`***************************扩展运算符**********************`)
const time = {
    year: 2021,
    month: 7,
    day: {
        value: 1,
    },
    data: {
        v1: 1,
        v2: 1,
    },
};
const copyTime = { ...time };
// { year: 2021, month: 7, day: { value: 1 }, data: { v1: 1, v2: 1 } }
console.log(time, copyTime); 

copyTime['year'] = 2023
copyTime['day']['value'] = 2
copyTime['data'] = {'value': 0}
// { year: 2021, month: 7, day: { value: 2 }, data: { v1: 1, v2: 1 } } 
// { year: 2023, month: 7, day: { value: 2 }, data: { value: 0 } }
console.log(time, copyTime); 

copyTime.day.value = 4;
copyTime.month = 6;
// { year: 2021, month: 7, day: { value: 4 }, data: { v1: 1, v2: 1 } }
// { year: 2023, month: 6, day: { value: 4 }, data: { value: 0 } }
console.log(time, copyTime); 


// 【slice】
// 不改变原数组
let arr = [1,2,3,4]
console.log(arr.slice() === arr);


// 【concat】
// 不改变原数组，创建一个新数组
// 参数可以接受数组或者多个参数
console.log(arr.concat() === arr);


// 自定义浅拷贝
console.log(`***************************自定义浅拷贝**********************`)
// :params obj: 需要被浅拷贝的对象
function shadowCopy(obj){
    if(typeof obj !== 'object'){
        throw new Error(`${obj} is not a object`)
    }

    
    let targetObj = Array.isArray(obj)? []: {}
    for(let key in obj){
        // 是obj的自有属性
        // 如果不使用 hasOwnProperty 方法进行判断，也会遍历它的原型链上的属性，
        if(obj.hasOwnProperty(key)){
            targetObj[key] = obj[key]
        }
    }
    return targetObj
}

let showCopyDt = shadowCopy(time);
console.log(showCopyDt, showCopyDt === time);
let showCopyDt2 = shadowCopy([1,2,3,4]);
console.log(showCopyDt2);

