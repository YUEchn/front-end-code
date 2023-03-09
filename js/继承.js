// 【原型链继承】
/*
    实现原理：让构造函数的原型（prototype）指向另一个构造函数的实例
*/
function Parent(nation, age){
    this.nation = nation || 'China'
    this.info = {
        'age': age
    }
}

function Child(){
    this.name = 'aaa'
}

// Child构造函数的原型指向Parent构造函数的实例
Child.prototype = new Parent('US')
let child1 = new Child()
let child2 = new Child()
console.log('原型链继承：', child1.info, child2.info); // {age: undefined} {age: undefined}
child1.info.age = 20
child1.nation = 'JP'
// 修改原型上的引用类型属性，所有子实例都发生变化
console.log('原型链继承：', child1.nation, child2.nation, child1.info, child2.info); // JP US {age: 20} {age: 20}

