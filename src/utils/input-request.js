import axios from 'axios'
// import { Message } from "element-ui";

/**
 * 生信 模型预测服务的接口
 */

// create an axios instance
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? '' : 'http://10.0.5.226:8080',
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   *
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.code !== 0) {
      // Message({
      //   message: res.error || "Error",
      //   type: "error",
      //   duration: 5 * 1000
      // });

      return Promise.reject(res, new Error(res.error || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // Message({
    //   message: error.error,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return Promise.reject(error)
  }
)

export default service
