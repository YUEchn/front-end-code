// 字符串的repeat方法，重复字符串
// 不会改变原字符串
// 

String.prototype.myRepeat = function(){
    
    let times = Number(arguments[0])
    if(!isNaN(times) && times > 0){
        return Array(times - 1).fill(1).reduce((prev, cur) => prev + prev, this + '')
    }
    return ''
}

let a = 'A'

console.log("A".myRepeat("a"));     // ''
console.log("A".myRepeat("2"));     // 'AA'
console.log("A".myRepeat({}));      // ''
console.log("A".myRepeat(null));    // ''
console.log("A".myRepeat(undefined)); // ''
console.log("A".myRepeat([]));   // ''
console.log('true', "A".myRepeat(true));  // 'A'
console.log("A".myRepeat(false)); // ''
console.log("A".myRepeat(NaN));   // ''