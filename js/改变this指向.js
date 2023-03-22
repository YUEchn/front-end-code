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