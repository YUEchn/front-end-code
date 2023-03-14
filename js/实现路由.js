// 实现简单路由

class Route{
    constructor(){
        // 定义路由对象
        this.routes = {}
        // 当前hash值
        this.currentHash = ''
        // 绑定this，避免监听的时候改变this执行
        this.freshRoute = this.freshRoute.call(this)

        // 绑定在冒泡阶段
        window.addEventListener('load', this.freshRoute, false)
        window.addEventListener('hashchange', this.freshRoute, false)

    }

    // 更新
    freshRoute(){
        // location.hash: #xxxx，取出#后面的部分
        this.currentHash = location.hash.slice(1) || '/'
        this.routes[this.currentHash]()
    }

    // 存储
    storeRoute(path, cb){
        this.routes[path] = cb || function(){}
    }


}