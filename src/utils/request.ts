import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { ElMessageBox, ElMessage } from 'element-plus'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent

    if (store.userStore.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['Authorization'] = getToken()
      config.headers = {
        Authorization: getToken()
      }
    }
    return config
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => {
    const res = response.data
    if (response.status === 200 && res.byteLength) {
      return response
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      console.log(res)
      ElMessage({ type: 'warning', message: res.msg })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === '401') {
        // to re-login
        ElMessageBox.confirm('您没有查看数据的权限，需要重新登录', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          type: 'warning'
        }).then(() => {
          location.reload()
          removeToken()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
