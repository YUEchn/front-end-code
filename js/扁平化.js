

function myFlaten(arr){
    let res = []
    for(let item of arr){
        if(Array.isArray(item)){
            res.push(...myFlaten(item))
        }else{
            res.push(item)
        }
    }
    return res
}


// 使用reduce方法实现
// 递归调用
function myFlaten2(arr){
    return arr.reduce((prev, cur) => {
        if(Array.isArray(cur)){
            return [...prev, ...myFlaten2(cur)]
        }
        return [...prev, cur]
    }, [])
}

// 使用正则表达式和JSON.stringify()
function myFlaten3(arr){
    let arrStr = JSON.stringify(arr)
    arrStr = arrStr.replace(/(\[|\])/g, '')
    let arrStr2 = `[${arrStr}]`
    return JSON.parse(arrStr2)

}

console.log(myFlaten([1, 2, 3, 4, 5]));
console.log(myFlaten([1, 2, [3, 4,7,8], 5]));
console.log(myFlaten([1, 0, [2, [3, 4,7,8]], 5]));
console.log(myFlaten2([1, 2, 3, 4, 5]));
console.log(myFlaten2([1, 2, [3, 4,7,8], 5]));
console.log(myFlaten2([1, 0, [2, [3, 4,7,8]], 5]));
console.log(myFlaten3([1, 2, 3, 4, 5]));
console.log(myFlaten3([1, 2, [3, 4,7,8], 5]));
console.log(myFlaten3([1, 0, [2, [3, 4,7,8]], 5]));
