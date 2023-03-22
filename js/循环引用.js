
// 测试数据
var a = {
    b:{
        c:{}
    }
};

a.b.c.d = a;

// 检测是否存在循环引用，返回true、false
function hasCircularReference(obj) {
    let parentArr = []

    function detect(obj){
        if(typeof obj === 'object' && obj !== null){
            if(parentArr.includes(obj)){
                return true
            }
            parentArr.push(obj)

            for(let key in obj){
                let resp = detect(obj[key])
                if(resp){
                    return true
                }
            }

        }
        return false
    }

    return detect(obj)

  }
  
console.log(hasCircularReference(a, []));


// 检测是否存在循环引用并给出存在的位置
function detect2(obj, parentArr){
    for(let key in obj){
        if(typeof obj[key] === 'obj' && obj[key] !== null){
            if(parentArr.includes(key)){
                obj[key] = ['circle']  // 可以在这里直接更改（因为都是指向的地址）
            }
            detect2(obj[key], [...parentArr, obj[key]])
        }
    }
    return obj
}

// 第二给参数是所有的key-value对
console.log(detect2(a, [a]));
