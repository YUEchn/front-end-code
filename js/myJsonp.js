
// 前端
// 动态创建script脚本
// 只能使用get请求 
function myJsonp(src){
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
}


function handleRes(p1, p2, p3){
    console.log(p1, p2, p3);
    
}

myJsonp("http://xxx.xxx.com/xxx.js?callback=handleRes")

// 后端数据处理与返回值
// 返回的数据格式： handleRes(p1, p2, p3)
const express = require('express')
const app  = express()
app.get('url', (req, res) => {
    let (params, callback) = req.query
    res.send(`${callback}(xinshuju)`)
})