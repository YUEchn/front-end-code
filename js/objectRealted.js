// 手写 Object.create：创建一个新对象，带着指定的原型对象及其属性
// 使用proto创建一个新的对象
// constructor必须是null或者Object
function createObject(proto, properties){
    if(typeof proto !== 'object' && typeof proto !== 'function'){
        console.log('不是一个Object或者不是null');
        return
    }
    // 定义一个空对象
    const obj = {}
    // obj.__proto__ = proto
    Object.setPrototypeOf(obj, proto) // 推荐
    if(properties){
        // 为空对象添加属性
        Object.defineProperties(obj, properties)
    }
    return obj
}

let createObjectInstance = createObject({a: 11}, {1:{value:1}})


// 实现instanceof方法：只能判断引用类型
// 实现思路：顺着原型链向上找
function myInstanceOf(leftObj, rightObj){
    if(typeof leftObj !== 'object' || leftObj === null || typeof rightObj !== 'function'){
        return false
    }
    
    const prototype = rightObj.prototype  // 获取构造函数的原型
    let proto = Object.getPrototypeOf(leftObj)  // 获取实例对象的原型

    while(proto){
        if(proto === prototype){
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

// console.log('muInstanceOf', myInstanceOf({}, Object));


// 实现 new 操作符
function MyNew(fn){
    // 获取函数参数
    // const constructor = [...arguments].shift()
    const params = [...arguments].slice(1)
    if(typeof fn !== 'function'){
        throw new Error('constructor type error')
    }
    
    // 1. 创建一个空对象
    let obj = {}
    // let obj = Object.create(constructor.prototype)  // 创建空对象并设置原型

    // 设置空对象的原型指向构造函数的原型
    Object.setPrototypeOf(obj, fn.prototype)

    // 更改this指向实例本身，并执行函数
    let result = fn.apply(obj, params)

    let flag =  result && (typeof result === 'object' || typeof result === 'function')

    return flag ? false : obj
}

function Foo(name, value){
    this.name = name;
    this.age = value;
}

let p = new Foo('cao', 19)

let newInstace = new MyNew(Foo, 'yue', 18)
console.log(p, newInstace);
