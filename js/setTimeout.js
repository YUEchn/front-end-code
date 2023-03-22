

// setTimeout((a, b, c) => {
//     console.log(a, b, c);
// }, 1000, 11, 22, 33)

// setTimeout(console.log, 1000, 11, 22, 33)  // 输出 1 2 3
// setTimeout(console.log, 1000)  // 没有输出
// 可以通过第三个参数的方式解决循环打印的问题
for(var i = 0; i< 6; i++){
    setTimeout(console.log, 2000, i)
}

for (var i = 0; i < 6; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j)
      }, 1000)
    })(i)
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      console.log(i)
    }, 1000)
  }