const { resolve } = require("path");
const { reject } = require("prelude-ls");

/* 
手写promise
特点:
    定义三种状态：pending，resolved，rejected;
    定义两个函数：resolve，reject;
    只以第一次的返回状态为准；
    throw等同于执行了reject；



*/
const result = []
const promisesResolved = [
    Promise.resolve('First resolve promise'),
    'Non-promise value',
    Promise.resolve('Third resolve promise')
  ];
const promisesRejected = [
      new Promise((resolve)=>{
        resolve('First resolve promise')
      }),
      'Non-promise value',
      Promise.reject('Third reject promise'),
      Promise.reject('four reject promise'),
      new Promise((resolve)=>{
        resolve('Five resolve promise')
        setTimeout(()=>{
            console.log('1111111111')
        }, 5000)
      })
    ];

// 原始的promise.all
function promiseAllOrigin(){

      /*返回所有成果的结果：
        [
            'First resolve promise',
            'Non-promise value',
            'Third resolve promise'
        ]
      */
      Promise.all(promisesResolved.map(p => Promise.resolve(p)))
        .then(results => console.log(results))
        .catch(error => console.error(error));

        /* 捕获第一个失败的，其他继续执行：
            1111111111
            1111111111
            Third reject promise
        */
        Promise.all(promisesRejected.map(p => Promise.resolve(p)))
        .then(results => console.log(results))
        .catch(error => console.error(error));
}


/*
手写Promise.all：ES6方法
特点：
    参数：可迭代对象，如果其中有不是promise对象的，会被转为promise对象；
    返回值：异步方法，返回【一个Promise对象】:
        传入的所有Promise最终都转化为fulfilled态时，则会执行resolve回调，返回值是所有的Promise的resolve的回调的value的数组；
        任何一个Promise为reject状态时，则返回的Promise的状态更改为rejected。catch捕获第一个reject，且【继续执行】；

    then参数：可迭代对象按顺序的执行结果

步骤：
    接受promise实例的数组或者可迭代对象的数组；如果数组中的元素不是promise就将它转为promise
*/

let count = 0
function myPromiseAll(promises){
    if(!Array.isArray(promises)){
        throw new Error('argument is not a array')
    }
    let promiseArr = []
    // let count = 0; // 完成的promise数量，处理异步的情况，不能直接使用index判断
    return new Promise((resolve, reject)=>{
        promises.forEach((p, i) => {
            // 确保每一个元素都是promise对象
            Promise.resolve(p).then(res => {
                promiseArr[i] = res 
                count += 1
                // 全部promise都执行完成
                if(count === promises.length){
                    resolve(promiseArr)
                }
            }).catch(reject)
        })

    })
}
//---------------- 原生方法--------------
// promiseAllOrigin() 
//---------------- 自定义方法 --------------
// myPromiseAll(promisesResolved).then(res => console.log(res)).catch(err => console.log(err));
// myPromiseAll(promisesRejected).then(res => console.log(res)).catch(err => console.log('promisesRejected出错啦！', err));






/*
手写Promise.race：ES6方法
特点：
    参数：可迭代对象，如果其中有不是promise对象的，会被转为promise对象；
    返回值：异步方法，返回【一个Promise对象】:
        以状态变化最快的那个 Promise 实例为准；

    then参数：可迭代对象按顺序的执行结果

步骤：
    接受promise实例的数组或者可迭代对象的数组；如果数组中的元素不是promise就将它转为promise
*/
function myPromiseRace(promises){
    if(! Array.isArray(promises)){
        throw new Error('data type error')
    }

    return new Promise((resolve, reject) => {
        promises.forEach((p) => {
            Promise.resolve(p).then(resolve, reject)
        })
    })

}

// myPromiseRace(promisesResolved).then(res=>console.log(res)).catch(err => console.log(err))
// myPromiseRace(promisesRejected).then(res=>console.log(res)).catch(err => console.log(err))


// 使用promise和async/await实现并发请求
function getData(){
    return new Promise(resolve => {






    })
}
getData(url, maxNumber).then((res) => console.log(res))