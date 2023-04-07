// 防抖
// 原理：一段时间内多次触发，只有最后一次触发生效
function myDebounce(fn, delay, immediate = false){
    let timer = null

    // 返回一个闭包，才能获取父级作用域中的timer
    return function(){
        clearInterval(timer)

        if(immediate){
            fn.apply(this, arguments)
        }else{
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, delay)
        }
    }
}


// 节流
// 单位之间内多次触发，只有第一次触发生效
function myThrottle1(fn){
    let flag = true

    return function(){
        // 如果是不可执行阶段，就直接返回
        if(!flag) return

        // 每个单位之间内的第一次触发，应该执行
        if(flag){
            fn.apply(this, arguments)
            flag = false
        }
        setTimeout(() => {
            flag  = true
        }, delay)
    }
}

function myThrottle2(fn, delay){
    let curTime = Data.now()
    return function(){
        let time = Data.now()
        if((time - curTime) > delay){
            curTime = time
            fn.apply(this, arguments)
        }
        return
    }
}