// 【fetch】
// fetch: ES6提出的一种方式，是基于promise实现的，是xhr的替代品
// fetch：采用then的链式调用的方式，避免了回调地狱问题
/*
    fetch(url).then((res) => res.json()).then((data) => console.log(data))
*/

// 【2. axios】
// 是基于xhr进行的二次封装，可以用promise进行封装
// 解决高并发：axios.all(、axios.spread()
// axios.all：接受一个数组作为参数，数组中的每个元素都是一个请求，返回一个[promise]对象，当数组中所有请求均已完成时，执行then方法。
// axios.spread：接收一个函数作为参数，返回一个新的函数。接收的参数函数的参数是axios.all方法中每个请求返回的响应。
/*
    function getUserAccount() {
    return axios.get('/user/12345');
    }

    function getUserPermissions() {
    return axios.get('/user/12345/permissions');
    }

    axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread((acct, perms) => {
        // 两个请求都完成后，操作
    }));
    
*/
/* 原始方法 */
axios.get(url, {
    params: {
        id: 'id'
    }
}).then(res => res)
axios({
    method: 'get',
    url: 'url',
    params: {
        id: 12
    }
}).then(res => res)

axios.post(url, {
    id: 'id'
}).then(res => res)
axios.post('/user', {userId: "123"}, {headers: { token: "abc" }})
.then(function (res) {
    console.log(res);
})
.catch(function (error) {
    console.log(error);
});



/* 2.1 封装请求方法 */
const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axiso.get(url, { params: params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            })
    })
}

const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            })
    });
}


class HttpRequestUtil {







}