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

function test() {
  new Promise((resolve) => {
    console.log(444444444);
    setTimeout(() => {
      console.log(111111);
      // resolve(console.log(111111))
    }, 3000);
  });
}

async function start() {
  console.log(000000);
  await test();
  console.log(22222);
}

//   0 - 4 - 3 - 2 - 1
start();
console.log(3333333);

let aaa = new Promise((resolve, reject) => {
    reject('error')
})
// 可以被多次捕获
aaa.catch(err => {
    console.log(err)
}).catch(err => console.log('第二层err'))
aaa.catch(err => {
    console.log(err)
}).then(res => console.log('catch的then', res))
aaa.catch(err => {
    console.log(err)
})

// 如果不是一个函数的话就会被继续捕获
aaa.catch(console.log('444')).catch(err => {console.log('漏掉的catch', err);
})