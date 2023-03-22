

var a =[1,2,3,4]
console.log(Object.prototype.toString.call(a))
console.log(a.constructor === Array)
console.log(Array.isArray(a))
console.log(a instanceof Array)
console.log(a.__proto__ === Array.prototype);
console.log(Array.prototype.isPrototypeOf(a));
