
Array.prototype.myMap = function(fn){
    let newArr = this.reduce((prev, cur) => {
        return [...prev, fn(cur)]
    }, [])
    return newArr
}


let a = [1,2,3,4]
let b = a.myMap((value) => value*100)
console.log(b);

