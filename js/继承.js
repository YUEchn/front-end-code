
// Object.create(obj, properties)
// 可以不用单独创建构造函数就直接定义新的对象及其属性
const hjy = {
    eyes: 'black',
    colors: ['white', 'yellow', 'black']
  }
  
  const laowang = Object.create(hjy, {
    name: {
      value: '老王',
      writable: false,
      enumerable: true,
      configurable: true
    },
    age: {
      value: '32',
      writable: true,
      enumerable: true,
      configurable: false
    }
  })
  
  console.log(laowang.eyes) // black
  console.log(laowang.colors) // ['white', 'yellow', 'black']
  console.log(laowang.name) // 老王
  console.log(laowang.age) // 32

//   【原型链继承】
// 【原型链继承】
/*
    实现原理：让子类构造函数的原型（prototype）指向父类构造函数的实例
    缺点：
        过多的继承了无用的属性；
        对原型上引用类型的修改会影响所有的子实例(同一个new Parent()下面的所有子类)；
        子类的实例不能直接向父类构造函数传参

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

Child.prototype = new Parent('US')
let child1 = new Child()
let child2 = new Child()
console.log('原型链继承：', child1.info, child2.info); // {age: undefined} {age: undefined}
child1.info.age = 20
child1.nation = 'JP'
// 修改原型上的引用类型属性，所有子实例都发生变化
console.log('原型链继承：', child1.nation, child2.nation, child1.info, child2.info); // JP US {age: 20} {age: 20}
Child.prototype = new Parent('AAA')
let child3 = new Child()
child3.info.age = 30
console.log('原型链继承：', child3.nation, child2.nation, child1.info, child2.info, child3.info );

// 构造函数继承（类式继承）
// 原理：在子类的构造函数中调用父类构造函数，实现上下文绑定
// 特点：
//      可以传参，对一个子类原型的修改不会影响其他
//      必须在子类构造函数中定义方法，通过盗用构造函数继承的方法本质上都变成了实例自己的方法，不是公共的方法，因此失去了复用性。
// 

function ClassParent(name, age){
    this.name = name
    this.age =age
}
function ClassChild(name, age, address){
    ClassParent.call(this, name, age)
    this.address = 'china'
}

let classC1 = new ClassChild('class1', 10, '重庆')