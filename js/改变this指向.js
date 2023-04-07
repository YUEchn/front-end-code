// 使用闭包改变this指向
const obj1 = {
  obj1_name: "obj1",
  sayName: () => {
    console.log(this, this.obj1_name);
  },
  sayName2: function () {
    console.log(this, this.obj1_name);
  },
  sayName3: function () {
    // 可能会出现内存泄漏
    const that = this;
    const innerSayName = () => {
      console.log(that, that.obj1_name);
    };
    innerSayName();
  },
};

console.log("*******************闭包*******************");

obj1.sayName();
obj1.sayName2();
obj1.sayName3();

// 使用函数包装器
// 使用一个函数包装器，将箭头函数作为参数传给包装器
console.log("*************************函数包装器****************");

function wrapper(callback) {
  return function () {
    callback.call(this, arguments);
  };
}

const obj = {
  name: "foo",
  func: function () {
    const arrowFunc = () => {
      console.log(this.name);
    };
    wrapper(arrowFunc).apply(this);
  },
};

obj.func(); // 输出: 'foo'


// test this
// 对象的{}不能构成一个作用域
const testObj = {
    getArrow(){
        return () => {
            console.log(this === testObj);
        }
    }
}
const testObj2 = {
    getArrow2: () => {
        console.log(this === testObj2);
    },
    getArrow(){
        //  指向了getArrow的this，而且getArrow由testObj2调用，所以指向testObj2
        const a = () => {
            console.log(this === testObj2);
        }
        return a
    }
}
testObj.getArrow()()  // true
testObj2.getArrow()() // true
testObj2.getArrow2()  // false


var name = "windowsName";

var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)     
    },

    func2: function () {
        console.log(this.name);
        let that = this
        // setTimeout是挂在在window上的
        // 两种this：调用函数的this，函数内部的this
        // 变量：
          // 回调函数中的变量根据上下文读取
        setTimeout(function () {
            // 此时的this指向window，会报错
            // this.func1()

            // 改变this
            that.func1()
            
        },100);
    }

};

// a.func2()     // this.func1 is not a function


var test = "in the window";
 
setTimeout(function() {console.log('outer' + test)}, 0); // outer in the window  ，没有问题，在全局下调用，访问全局中的test

function f() {
  // 
  var test = 'in the f!';

  // 等同于闭包，能够访问父级作用域的变量
  setTimeout(function(){console.log('inner '+ test)}, 0);  // inner in the f!  有问题，不是说好了执行函数中的this指向的是window吗？那test也应该对应window下                                                      //  的值才对，怎么test的值却是 f()中的值呢？？？？
  setTimeout(console.log, 0, ('inner '+ test));  // inner in the f!  有问题，不是说好了执行函数中的this指向的是window吗？那test也应该对应window下                                                      //  的值才对，怎么test的值却是 f()中的值呢？？？？
  setTimeout(console.log, 0, ('inner '+ this.test));  // inner in the f!  有问题，不是说好了执行函数中的this指向的是window吗？那test也应该对应window下                                                      //  的值才对，怎么test的值却是 f()中的值呢？？？？

}
 
f();