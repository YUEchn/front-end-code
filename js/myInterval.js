
// 通过递归调用定时器
function myInterval(fn, delay){

    setTimeout(() => {
        fn()
        myInterval(fn, delay)
    }, delay)
}

console.log('开始计时');

myInterval(() => console.log(1), 1000)


function myInterval2(fn, delay){
    let timer = {
        flag : true
    }

    function interval(){
        if(timer.flag){
            fn();
            setTimeout(interval, delay)
        }
    }

    setTimeout(interval, delay)
    return timer
}

