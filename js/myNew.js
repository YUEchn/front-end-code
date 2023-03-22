function Person(){
    this.name = 'aaa'
}

function myNew(cons, ...args){
    // 取出构造函数
    let constructor = cons
    // 创建一个新的空对象并设置原型

    // Object.create(obj, properties)创建对象的时候设置新创建对象的原型
    let newObj = Object.create(constructor.protptype)

    // 将构造函数的this执行新创建的对象，同时会执行构造函数
    // result是构造函数执行后的返回值
    let result = constructor.apply(newObj, args)

    // 返回新创建的对象
    // 如果是引用类型，就返回构造函数执行时创建的对象
    if( result && (typeof result === 'object' || typeof result === 'function')){
        return result
    }
    // 说明构造函数的返回值是一个基本数据类型，因此返回新创建的实例
    return newObj
}