import axios from 'axios'
import { objToUrlParams } from '@/utils/tools.js'
import store from '@/store/index.js'
import { Dialog, Toast } from 'vant'

// 基础配置（只执行一次，不能用来做动态配置）
const service = axios.create({
  baseURL: '/api/shop',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  transformRequest: [data => data && objToUrlParams(data)]
})

/**
 * 请求拦截 config配置项
 * @params {string} url 接口地址
 * @params {string} method 请求方式
 * @params {object} data 参数数据
 * @params {boolean} isSelf 控制是否自行处理接口错误
 */
service.interceptors.request.use(
  config => {
    // 携带token
    if (store.getters) {
      config.headers.token = store.getters.token
    }

    // get方式 data转params
    if (config.method === 'get') {
      if (!config.params && config.data) {
        config.params = config.data
        config.data = undefined
      }
    }

    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // code为1000，正常返回数据
    if (res.code === 1000) {
      return res
    }
    if (res.code === 20001 || res.code === 1155) {
      Dialog.alert({
        title: '提示',
        message: '登录失效，请重新登录'
      }).then(() => {
        window.location.reload()
      })
    } else {
    // isSelf为true，返回数据
      if (response.config.isSelf) {
        return res
      }
      // 不符合预期，抛出错误信息
      Toast({
        message: 'Error：' + res.msg,
        duration: 5 * 1000
      })
      return Promise.reject(res.msg)
    }
  },
  err => {
    Toast({
      message: 'Error：' + err.message,
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default service
