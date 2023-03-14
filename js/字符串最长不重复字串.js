
// 使用O(n)事件复杂度

function maxLengthStr(str) {
    let subStr = []  // 用来保留最长字串
    let maxLength = 0
    let maxStr = ''
    for (let s of str) {
        if (subStr.includes(s)) {
            if (subStr.length > maxLength) {
                maxLength = subStr.length
                maxStr = subStr.join('')
            }
            let curIndex = subStr.indexOf(s)
            // console.log(subStr, curIndex, s)
            subStr = subStr.slice(curIndex + 1)
            // console.log(subStr);

        } else {
            subStr.push(s)
        }
    }
    return [maxLength, maxStr]
}

console.log(maxLengthStr('qwqwqw1233g'));
