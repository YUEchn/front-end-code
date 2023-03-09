

function myTypeof(arg){
    if(typeof arg !== 'object'){
        return typeof arg
    }

    let tp = Object.prototype.toString.call(arg)  // [object Object]
    let endIndex = tp.indexOf(']')
    let tp2 = tp.slice(8, endIndex)
    return tp2

}

console.log('{}', myTypeof({}));
console.log('5', myTypeof(5));
console.log('adad', myTypeof('adad'));
console.log('function(){}', myTypeof(function(){}));
console.log('undefined', myTypeof(undefined));
console.log('null', myTypeof(null));
console.log('null', myTypeof(new Date()));