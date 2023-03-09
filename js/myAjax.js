/*
步骤：
    1. 创建一个xhr对象
    2. 使用open创建一个xhr请求，设置请求方法
    3. 设置状态和监听函数
    4. 使用send发送请求
*/

const { url } = require("inspector")
const { resolve } = require("path")
const { reject } = require("prelude-ls")

function myAjax(){
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.onreadystatechange = function(){
        if(this.readyState !== 4) return
        if(this.status === 200){
            handle(this.response)
        }else{
            console.error(this.statusText);
        }
    }

    xhr.onerror = function(){
        console.error(this.statusText);
    }

    // 设置请求头信息
    xhr.responseType = 'json'
    xhr.setRequestHeader("Accept", "application/json")

    // 发送请求
    xhr.send(null)
}


// 使用promise封装Ajax请求
function myJson(){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
    
        xhr.onreadystatechange = function(){
            if(this.readyState !== 4) return
            if(this.status === 200){
                resolve(this.response)
            }else{
                reject(this.statusText);
            }
        }
    
        xhr.onerror = function(){
            reject(this.statusText);
        }
    
        // 设置请求头信息
        xhr.responseType = 'json'
        xhr.setRequestHeader("Accept", "application/json")
    
        // 发送请求
        xhr.send(null)
    })
}