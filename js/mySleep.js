// 基于promise和setTimeout实现sleep
function fnA() {
  console.log("A");
}
function fnB() {
  console.log("B");
}
function fnC() {
  console.log("C");
}

//  不使用sleep，使用定时器实现
console.log("***********************定时器实现**********************");
// setTimeout(fnA, 1000);
// setTimeout(fnB, 2000);
// setTimeout(fnC, 3000);

// 使用setTimeout实现sleep
console.log("***********************setTimeout实现sleep**********************");
function mySleep1(fn, delay) {
  // setTimeout(() => fn(), delay)  // 或者
  setTimeout(fn, delay);
}
// mySleep1(fnA, 1000); // 1 秒后输出 A
// mySleep1(fnB, 2000); // 2 秒后输出 B
// mySleep1(fnC, 3000); // 3 秒后输出 C

// 使用promise的链式调用实现sleep
console.log("***********************promise实现sleep**********************");
function mySleep2(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
// 不需要向sleep中传入回调函数
// mySleep2(1000).then(fnA)
// mySleep2(2000).then(fnB)
// mySleep2(3000).then(fnC)

// 使用async/await实现sleep
console.log(
  "***********************async/await实现sleep**********************"
);

// 也能限制同步任务的执行
async function mySleep3() {
  fnA();
  await mySleep2(1000);
  fnB();
  await mySleep2(1000);
  fnC();
}
mySleep3();
