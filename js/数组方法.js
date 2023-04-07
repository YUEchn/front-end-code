
// 后端异步返回一个结果
function returnRes(e){
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('setTimeout: ', e);
            // return e
            resolve(e)
        }, 1000)
    })
}



// 一、 for
/*
  1. 可以使用break;continue;return(return之后不会再执行)
  2. 可以使用await实现同步;
  3. 可以在循环过程中更改原数组，包括数组内容和数组长度，循环的次数依赖于最新的数组长度
*/
let arr1 = [1, 2, 3, 4]
for(let i=0; i<arr1.length; i++ ){
    // arr1.push(i)
    // console.log(arr1);
}

// 二、for in
/*
    1. 可以遍历对象【key】和数组【index】
    2. 可以实现同步
    3. 会遍历原型链
    4. 循环过程中增加/删除内容都会循环次数(字典和数组效果相同)，修改内容会获取到最新的值
    5. 改变值会动态改变输出的内容
    6. 可以使用break;continue;return
*/
let obj = {a: 'a', b: 'b', c:'c'}
for(let key in obj){
    // obj[key] = obj[key].repeat(2)
    // console.log(obj);
}

// 三、for of
/*
  1. 只能遍历数组
  2. 可以实现同步
  3. 不会遍历原型上的属性
  4. 添加/删除/更改内容都会更改循环次数和循环中获取的内容
  6. 可以使用break;continue;return
*/
let arr = [1, 2, 3, 4]
for(let key of arr){
    // arr.push(5)
    // console.log(key, arr);
}

// NOTE：
//  1) 同步回调：forEach、map、filter、reduce...
//  2) 异步回调：ajax回调、.then()、.catch()、setTimeout...

// 四、forEach
/*
  1. 使用continue/break会报错，使用return只是跳过了一次循环，还会接着执行 
  2. 不能实现同步（因为只是单个循环里面的异步，无法阻塞整体的执行）
  3. 增加内容不会改变循环次数，【减少内容会】改变循环次数，修改内容能获取到最新的值
  4. 不汇遍历原型
*/

let arr3 = [1,2,3,4,5]
let foreach_res = arr3.forEach((e) => {
    // arr3.shift()
    // console.log(arr3);
})

// 五、map
/*
  1. 使用continue/break会报错，使用return只是跳过了一次循环，还会接着执行 
  2. 不能实现同步
  3. 增加内容不会改变循环次数，【减少内容会】改变循环次数，修改内容能获取到最新的值
  4. 每个单个的回调函数默认返回undefined
*/
let arr4 = [1,2,3,4,5]
let map_arr = arr4.map((e) => {
    // arr4.push(1212)
    // arr4[4] = 888
})

// 六、filter
/*
    1. 当返回结果是true（会隐式转换）时，循环的当前项被加入filter_arr中;
    2. 不能实现同步;
    3. 使用continue/break会报错，使用return只是跳过了一次循环，还会接着执行;
    4. 【增加内容不会】增加循环次数，【删除内容会】减少循环次数
*/

let arr5 = [1,2,3,4,5]
let filter_arr = arr5.filter((e) => {
    // console.log(98989, arr5);
    return 1
})

// 七、reduce
// 1. 【增加内容不会】改变循环次数，【减少内容会】改变循环次数，修改内容能获取到最新的值
// 2. 不能实现同步
// 3. 使用continue/break会报错，使用return只是跳过了一次循环，还会接着执行 
// 
let arr6 = [1,2,3,4,5]
let reduce_arr = arr6.reduce((prev, curr) => {
    // arr6.shift(888)
    // console.log('323321');
    // return prev+curr
}, 0)


// find、findIndex
/*
  1. 返回符合条件的第一个元素（第一个元素的index)，没有符合的就是undefined；
  2. 使用continue/break会报错，使用return只是跳过了一次循环，还会接着执行；
  3. 不能实现同步；
  4. 增加/删除都不能改变循环次数，但修改内容能获取到最新的值
*/

let arr7 = [1, 2, 3, 4, 1]
let find_res = arr7.find(async (e) => {
    // arr7.pop()
    // arr7.push(999)
    // 不能起到同步作用
    // await returnRes(e)
    // console.log(1222122, arr7);
    return e === 5
})
let findindex_res = arr7.findIndex((e) => {
    return e === 2
})
// console.log('find执行完了');


// some/every
/*
  1. 返回是否有符合条件的，有就是true，没有符合的或者没有返回值就是false；
  2. some：会遍历所有的；every：当遇到不符合的就结束遍历；
  3. 【增加内容不会】改变循环次数，【减少内容会】改变循环次数，修改内容能获取到最新的值；
  4. 使用continue/break会报错，使用return只是跳过了一次循环，还会接着执行；
  5. 当回调函数是async并且没有await等待异步操作完成时，默认会返回true
     原因：异步函数返回promise对象，而promise对象是truthy;
           Boolean(Promise.resolve(0)) == true
*/

let arr8 = [9,8,7,6,5,4]
let some_res = arr8.some((e) => {
    arr8.push(999)
    // console.log('some');
    // await returnRes(e) 
    // return e === 70
})
// console.log('some_res', some_res);

let arr9 = [9,8,7,6,5,4]
let every_res = arr9.every(async e => {
    // arr9.push(999)
    // console.log('every_res');
    // return typeof e === 'number'
})
// console.log('every:', every_res);

function test(){
    // 就像这样，无法阻塞到外部的，只能诸塞内部的
    async function tt(){
        await returnRes(1)
        console.log('test innner');
    }
    tt()
    console.log('test outer');
}
test()