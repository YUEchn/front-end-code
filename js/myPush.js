
Array.prototype.myPush = function(){
    for(let i=0; i<arguments.length; i++){
        this[this.length] = arguments[i]
    }

    // push的返回值是数组的长度
    return this.length
}

let a = [1,2,3,4]
a.myPush(999)
console.log(a);

a.myPush([4,5,6,[7,9]])
console.log(a);

a.myPush(100, 200, 300)
console.log(a);
