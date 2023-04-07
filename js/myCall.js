// 链接：https://juejin.cn/post/7208063664824565815

// call、apply、bind作用是【改变函数执行时的上下文】，简而言之就是改变函数运行时的this指向
// 【call、apply】
// call: 接受多个参数，第一个参数是函数的上下文 this，后面的参数是函数本身需要的参数
// apply: 接受两个参数，第一个参数是函数的上下文 this，后面的参数是一个数组形式传入的
// 只是临时改变this指向一次，改变this指向后原函数会【立即执行】
const name="lucy";
const obj={
    name:"martin",
    say: function () {
        console.log(this.name, arguments);
    }
};
obj.say(); //martin，this指向obj对象
setTimeout(obj.say, 5000); //lucy，this指向window对象，5秒后输出
setTimeout(obj.say.call(obj, 'call之后'), 5000); //martin，this指向window对象，5秒后输出

// 实现call、apply
// 1. 判断调用对象是否为函数
// 2. 判断传入的上下文是否存在，不存在则设置为window
// 3. 处理传入的参数，获取除第一个参数之外的其余参数
// 4. 将函数作为上下文对象的一个属性
// 5. 使用上下文来调用函数，并保存返回结果
// 6. 从上下文中删除新增的属性
// 7. 返回结果


Function.prototype.mycall = function(context){   // 只有第一个参数，值对应第一个this
  if(typeof this !== 'function') return   // this是mycall的调用者
  
  context = context || window  // 如果设置的this是null或者undefined，则设置this为Window
 	console.log('this, context: ', this, context)
  let result = null
  context.fn = this    // 给上下文添加这个属性， 如果context中已经有了fn这个属性，就随机生成一个名称帮进行绑定

  // let params = [...arguments].slice(1)   // 取出参数
  // result = context.fn(...params)  // 执行函数
  
  // apply 方式
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn()
  }
  delete context.fn   //  从上下文中删除增加的属性
  return result
}

// obj.say.mycall(null, 'call之后'); //call lucy，this指向window对象，5秒后输出
obj.say.mycall(null, ['call之后']); //apply lucy，this指向window对象，5秒后输出

console.log('********************************* bind *****************************')
// bind
// 第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)
// 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
// 支持柯里化形式传参
// 返回一个绑定this的函数
// 【实现步骤】
// 保存调用函数的引用，获取剩下传入的参数值
// 创建一个函数返回
// 函数内部使用apply来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的this给apply调用，其余情况都传入指定的上下文对象
function bindFn(name, second, third){
  console.log('bindFn', this.name + ' '+ second +  ' ' + third)
}

let bindObj = {
    'name': 'bind'
}

let bindFn2 = bindFn.bind(bindObj)
// bindFn2(1,2)  // {'name': 'bind'}
// bindFn(1,2) // bindFn本身

Function.prototype.myBind = function(context){
  if(typeof this !== 'function') return   // 处理不是function调用的情况
	
  context  =context || window   // 处理this是null的情况
  let params = [...arguments].slice(1)   // 获取参数，第一次绑定bind的时候可能会传递参数
	
	let fn = this   // 保存闭包要使用的this, 保存当前函数的引用
	
	// 创建一个函数返回，这个函数的this还是context(非构造函数)
	function fBound(){
			// 因为支持柯里化形式传参，所以需要再次存储变量
			let newParams = [...arguments]  // 在调用的时候
			// 保证后面执行的时候还是fn进行调用的
			return fn.apply(this instanceof fBound ? this: context, params.concat(newParams))
	}
	return fBound
}
console.log('------------- 自定义bind -------------')
let bindFn3 = bindFn.myBind(bindObj, 'before bind', 'second')//返回的是一个函数，可以先绑定一些参数
bindFn3(777)   // 执行函数
// bindFn3(1, 2)   // 执行函数

// 如果绑定的函数被new了，当前函数的this需要是当前的实例而不是传入的上下文
let instance = new bindFn()





