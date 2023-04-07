// 字符串方法：
/*
  1. subString(start[, end])：对于其中的负数，会自动转化成为0，并且自动将小的值作为start
  2. subStr(start[, length])：如果star是负数，表示从倒数第几位开始向后数
  3. slice(start[, end])：
*/


// 将十六进制颜色转变成rgb
// :params color: #007acc(红 - 绿 - 蓝)
// :return color: rgb(0, 122, 204)
function hex2rgb(color){
    color = color.slice(1)
    console.log(color);
    let red = color.slice(0, 2)
    let green = color.slice(2, 4)
    let blue = color.slice(4)

    let chartMap = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'a': 10,
        'b': 11,
        'c': 12,
        'd': 13,
        'e': 14,
        'f': 15
    }

    let redNumber = chartMap[red[0]]*16 + chartMap[red[1]]
    let greenNumber = chartMap[green[0]]*16 + chartMap[green[1]]
    let blueNumber = chartMap[blue[0]]*16 + chartMap[blue[1]]
    return `rgb(${redNumber}, ${greenNumber}, ${blueNumber})`
}

function rgb2hex(color){
    const reg = /(\d+)/g
    let [red, green, blue] = color.match(reg).map(e => parseInt(e))
    let chartMap = {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: 'a',
        11: 'b',
        12: 'c',
        13: 'd',
        14: 'e',
        15: 'f'
    }

    let r = `${chartMap[parseInt(red / 16)]}${chartMap[red % 16]}`
    let g = `${chartMap[parseInt(green / 16)]}${chartMap[green % 16]}`
    let b = `${chartMap[parseInt(blue / 16)]}${chartMap[blue % 16]}`
    console.log(red, green, green / 16 , green % 16, blue, r, g, b);
    return `#${r}${g}${b}`


}

// console.log(hex2rgb('#007acc'));
console.log(rgb2hex('rgb(0, 122, 204)'));