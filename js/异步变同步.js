
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

// 前端获取数据
// 可以使用while、for()、promise.all、for in
// 不能使用forEach、map
async function getRes(){
    let arr = [1, 2, 3]
    for(let i of arr){
        let res = await returnRes(i)
        // 这里由于会先于setTimeout执行，所以没有结果
        console.log(res);
    }
    console.log('数据获取完成');
}



// 使用each map reduce等不能实现
// 原因：回调函数属于异步任务，会被加入微任务队列，等待同步任务执行完之后才会继续执行，所以不能实现同步
async function getRes2(){
    let arr = [1, 2, 3]

    arr.forEach(async e => {
        console.log('forEach:before');
        let res = await returnRes(e)
        console.log('forEach:', res);
    })

    
    arr.map(async e => {
        // let res = await returnRes(e)
        // console.log('map:', res); 

        /* **************************************************** */
        // // 只执行这个一个就会【后输出】
        // setTimeout(console.log, 0, 1)
        // // 只执行这一个就会【先输出】
        // console.log('map');
    })

    // arr.reduceRight(async function(prev, curr){
    //     let res = await returnRes(curr)
    //     console.log('map:', res); 

    //     // // 只执行这一个就会【先输出】
    //     // console.log('reduce');
    //     return 0

    // }, 0)
    
    // 不传入回调函数会报错
    // arr.forEach(console.log('map:'))


    // 这一步会先输出
    console.log('数据获取完成');
}



getRes()
// getRes2()