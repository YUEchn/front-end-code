// 
// 原型链继承：通过将【子类的原型指向父类实例】来实现继承。容易实现，但存在【引用类型共享问题】。
// 构造函数继承：通过在【子类构造函数中调用父类构造函数】来实现继承。可以【避免引用类型共享问题】，但【无法继承父类原型链上的属性和方法】。
// 组合继承：同时使用原型链和构造函数继承，可以继承父类原型链上的属性和方法，并避免引用类型共享问题。但是【父类构造函数会被调用两次】，可能会影响性能。
// 原型式继承：利用 Object.create 方法创建一个新对象，将新对象的原型指向父对象，达到继承的效果。与原型链继承类似，【存在引用类型共享问题】。
// 寄生式继承：与原型式继承类似，但是在新对象上添加了一些额外的方法或属性，达到了增强对象的目的。
// 寄生组合式继承：通过借用构造函数继承父类属性，通过原型链继承父类原型上的方法，达到继承的效果。同时，使用 Object.create 方法创建一个以父类原型为原型的新对象，并将其赋值给子类原型，避免了调用父类构造函数时重复创建对象和初始化的问题。



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

//   【1. 原型链继承】
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

// 【2. 构造函数继承（类式继承）】
// 原理：在子类的构造函数中调用父类构造函数，实现上下文绑定
// 特点：
//      可以传参，对一个子类原型的修改不会影响其他
//      必须在子类构造函数中定义方法，通过盗用构造函数继承的方法本质上都变成了实例自己的方法，不是公共的方法，因此失去了复用性。
//      子类不能调用父类构造函数原型上的方法

function ClassParent(name, age){
    this.name = name
    this.age =age
}
function ClassChild(name, age, address){
    ClassParent.call(this, name, age)
    this.address = 'china'
}

let classC1 = new ClassChild('class1', 10, '重庆')

// 【3. 组合继承】
/*

  继承了原型链继承和类式继承的优点
  调用了两次父类构造函数；

*/
function Person(eyes) {
  this.eyes = eyes
  this.colors = ['white', 'yellow', 'black']
}
Person.prototype.getEyes = function () {
  return this.eyes
}
function YellowRace() {
  Person.call(this, 'black') // 调用构造函数并传参
}
YellowRace.prototype = new Person() // 再次调用构造函数

const zuhe = new YellowRace()
hjy.colors.push('green')
const zuheChild = new YellowRace()

console.log(zuhe.colors) // ['white', 'yellow', 'black', 'green']
console.log(zuheChild.colors) // ['white', 'yellow', 'black']
console.log(zuhe.getEyes()) // black

// 【4. 原型式继承】
// 将原型链的继承封装成了一个函数，并利用一个空对象作为中介
// 不能传参
// 引用类型的属性会被新对象共享
const object = function (obj){
  function F(){}
  F.prototype = obj
  return F()
}

const yuanxingshi = {
  eyes: 'black',
  colors: ['red', 'green', 'blue']
}

let b = object(yuanxingshi)
console.log(b.eyes);
console.log(b.colors);


// 【5. 寄生式继承】
// 原理：在原型式继承的基础上以某种方式增强对象，然后返回这个对象。
// 为构造函数增强属性和方法，增加函数
function inherit(o) {
  let clone = Object.create(o)
  clone.sayHi = function () { // 增强对象
    console.log('Hi')
  }
  return clone
}

const jisheng = {
  eyes: 'black',
  colors: ['white', 'yellow', 'black']
}

const c = inherit(hjy)

console.log(laowang.eyes) // black
console.log(laowang.colors) // ['white', 'yellow', 'black']
laowang.sayHi() // Hi

// 【6. 寄生式组合继承】
// 结合借用构造函数传递参数和寄生模式实现继承
function inheritPrototype(Child, Parent){
  // 创建一个父类原型的副本
  const prototype = Object.create(Parent.prototype)
  // 增强对象：弥补因为重写原型导致constructor丢失的问题
  prototype.construtor = Child
  // 将新创建的对象赋予子类的原型
  Child.prototype = prototype
}
// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};
// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}
// 将父类原型指向子类
inheritPrototype(SubType, SuperType);
// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]