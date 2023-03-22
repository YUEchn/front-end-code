function a() {
  console.log(1111111);
}

async function b() {
  console.log(22222222);
}

async function exec() {
  await a();
  await b();
  // 不使用await就不会阻塞
  // a()
  // b()
  console.log(3333333);
}

// exec()
// console.log(44444444);

// await会阻塞后面的代码，直到promise对象resolve，然后得到resolve的值
function test1() {
  return new Promise((resolve) => {
    console.log(444444444);
    setTimeout(() => {
      resolve(console.log(111111));
    }, 3000);
  });
}

async function start1() {
  console.log(000000);
  await test1();
  console.log("test1执行完了");
  console.log(22222);
}
// 0 4 3 1 test1执行完了 2
// start1()
// console.log(3333333);

function test2() {
  return new Promise((resolve) => {
    console.log("**", 444444444);
    setTimeout(() => {
      console.log("**", 111111);
      // resolve(console.log('**', 111111))
    }, 3000);
  });
}

async function start2() {
  console.log("**", 000000);

  // 返回的promise没有resolve，因此await等不到resolve撞状态，所以不会执行后面的
  await test2();
  console.log("test2执行完了");
  console.log("**", 22222);
}

// 输出：0 4 33 1
// start2()
// console.log('**', 3333333);

// 函数默认返回值是undefined，因此await后面的能够执行
function test3() {
  new Promise((resolve) => {
    console.log("**", 444444444);
    setTimeout(() => {
      console.log("**", 111111);
    }, 3000);
  });
  // throw new Error('9999')
}

async function start3() {
  console.log("**", 000000);

  await test3();
  console.log("test3执行完了");
  console.log("**", 22222);
}

// 输出：0 4 3  test3执行完了 2 1
start3();
console.log("**", 3333333);

function foo() {
  const a = () => {
    console.log("aaa", this.id);
  };
  a();
  return () => {
    return () => {
      return () => {
        console.log(this.id);
      };
    };
  };
}

// 这里之所以能用foo的this，是因为foo是一个function
// 内层函数都是箭头函数，都没有自己的 this
// 它们的 this 其实都是最外层 foo 函数的 this
// 输出： 1
var f = foo.call({ id: 1 });
var t1 = f.call({ id: 2 })()();
var t2 = f().call({ id: 3 })();
var t3 = f()().call({ id: 4 });



function testArrow(){
  const name = 'testObj'
  const obj = {
    name: 'obj',
    sayName: () => {
      // {'ahahah': 4545}，他的 this 跟着testArrow走
      console.log(this);
    },
    sayName2: function(){
      const sayName3 = () => {
        console.log(this);
      }
      sayName3()
    }
  }

  
obj.sayName()
obj.sayName2()
}
// testArrow.call({'ahahah': 4545})



var obj = {
  a: 1,
  foo: function(b){
    b = b| this.a
    return function (c){
      console.log(this.a+b+c);
    }
  }
}

var a = 2
var obj2 = { a: 3}
obj.foo(a).call(obj2, 1)  // 
obj.foo.call(obj2)(1)