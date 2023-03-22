// 【fetch】
// fetch: ES6提出的一种方式，是基于promise实现的，是xhr的替代品
// fetch：采用then的链式调用的方式，避免了回调地狱问题
/*
    fetch(url).then((res) => res.json()).then((data) => console.log(data))
*/

// 【2. axios】
// 是对xhr基于promise进行的二次封装
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
import axios from "axios";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 比如添加token
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// GET 请求示例代码
axios
  .get("/api/user", {
    params: {
      name: "john",
      age: 30,
      gender: "male",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
//   后端读取get参数
let param1 = req.query.param1

// POST 请求示例代码
axios
  .post(
    "/api/user",
    {
      name: "john",
      age: 30,
      gender: "male",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
//   后端读取get参数
let param2 = req.body.param2
/////////////////////////////////////////



/* 2.1 封装请求方法 */
const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axiso
      .get(url, { params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

class HttpRequestUtil {}
