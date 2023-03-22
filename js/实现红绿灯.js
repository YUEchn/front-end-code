// 循环打印红绿灯
// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
const task = (timer, light) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if(light === 'r'){
                console.log('r')
            }else if(light === 'g'){
                console.log('g');
                
            }else{
                console.log('b');
            }
            resolve([])
        }, timer)


    })

}

// then里面不能直接使用，
const show = () => {
    task(1000, 'r').then(() => task(1000, 'g')).then(() => task(1000, 'b')).then(show)
}

show()