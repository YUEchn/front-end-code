// 实现函数柯里化
// 柯里化：一种将多个参数的函数，转换成一系列使用一个或多个参数的函数的技术。

// :params fn：要执行的事件
function Mycurry(fn){
    let args = []  // 保存参数的数组
    // 返回一个函数
    return function closure(){
        let curArg = [...arguments]
        args = [...args, ...curArg]
        
        // 停止条件：没有传递新的参数
        if(curArg.length === 0){
            return fn(args)
        }

        // 还有新的参数，就添加参数进去
        return closure
    }
}




function cal(args){
    return args.reduce((tatal, cur)=> tatal + cur, 0)
}

// 函数柯里化实现累加
const calCurry = Mycurry(cal)
console.log('calRes', calCurry(1)(2,3)(4,5)(7)())



function Mycurry1(fn){
    // 函数fn需要的参数的长度
    let length = fn.length
    let args = []

    return function closure(){
        let curArg = [...arguments]
        args = [...args, ...curArg]
        if(args.length === length){
            return fn(...args)
        }
        return closure
    }
}
function cal1(a1, a2, a3, a4, a5, a6){
    let args = [...arguments]
    console.log(args);
    return args.reduce((tatal, cur)=> tatal + cur, 0)
}

// 函数柯里化实现累加

const calCurry1 = Mycurry1(cal1)
console.log('accroding params length', calCurry1(1)(2,3)(4,5)(7))


// 实现sum(1)(2,3)(4).sumOf()

function sum(){
    let res = [...arguments].reduce((total, cur) => total+ cur, 0);
    function add(){
        const curArg = [...arguments]
        res = curArg.reduce((total, cur) => total+ cur, res)

        return add
    }
    
    add.sumOf = function(){
        return res
    }

    return add
}
console.log('sum(1)(2,3)(4,5)(7)', sum(1)(2,3)(4,5)(7).sumOf())


// 蚂蚁笔试
const addRemote = async (a, b) => new Promise(resolve => {
    setTimeout(() => resolve(a + b), 1000)
})

async function add(...inputs) {
    let params = [...inputs];
    let res = 0;
    async function cal(){
        if(params.length > 0){
            res  =  await addRemote(res, params[0])
            params.shift(1)
            
            if(params.length === 0){
                return 
            }
            return await cal()
        }
        

    }
    await cal()
}



add(1, 2)
  .then(result => {
    console.log(result) // 3
  })

add(3, 5, 2)
  .then(result => {
    console.log(result) // 10
  })