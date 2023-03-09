// 防抖基本版本
function myDebounce(fn, delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);

    }
}


/* 调用

function fn(param, params){...}
let inputObj = ...
-------传参数版本
inputObj.addEventListener('click', myDebounce(fn, 100).bind(inputObj, param, params))

------无参数版本
inputObj.addEventListener('click', myDebounce(fn, 100))

*/

// 防抖 立即执行版本
function myDebounce2(fn, delay){
    let timer = null
    let flag = true

    return function(){
        clearTimeout(timer)
        if(flag){
            fn.apply(this, arguments)
            flag = false
        }
        setTimeout(() => {
            flag = true
        }, delay);
    }
}

// 节流
// 实现方式
function myThrottle(fn,delay){
    let flag = true
    return function(){
        if(flag){
            flag = false
            setTimeout(() => {
                fn.apply(this, [...arguments])
                flag = true
            }, delay)
        }
    }
}

// 实现方式2: Data
function myThrottle2(fn, delay){
    let curTime = Date.now()
    return function(){
        let time = Date.now()
        // 两次事件超过了指定时间才会触发新的事件
        if(time - curTime >= delay){
            curTime = time
            fn.apply(this, [...arguments])
        }
    }
}

// 实现方式3：setTimeout，立即执行版本
function myThrottle3(fn, delay){
    let flag = true
    return function(){
        if(flag){
            fn.apply(this, [...arguments])
            flag = false
        }
        
        setTimeout(() => {
            flag = true
        }, delay)
    }
}