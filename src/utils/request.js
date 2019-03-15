import axios from 'axios'
import { objToUrlParams } from '@/utils/tools.js'
import { getToken } from '@/utils/storage.js'
import { Dialog, Toast } from 'vant'

const service = axios.create({
  baseURL: '/api/shop',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    token: getToken()
  },
  transformRequest: [data => data && objToUrlParams(data)]
})

/**
 * config参数项
 * @params {string} url 接口地址
 * @params {string} method 请求方式
 * @params {object} data 参数数据
 * @params {boolean} isSelf 控制是否自行处理接口错误
 */
service.interceptors.request.use(config => {
  if (config.method === 'get') {
    if (!config.params && config.data) {
      config.params = config.data
      config.data = undefined
    }
  }
  return config
}, err => {
  Promise.reject(err)
})

service.interceptors.response.use(response => {
  const res = response.data
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
    if (response.config.isSelf) {
      return res
    }
    Toast({
      message: 'Error：' + res.msg,
      duration: 5 * 1000
    })
    return Promise.reject(res.msg)
  }
}, err => {
  Toast({
    message: 'Error：' + err.message,
    duration: 5 * 1000
  })
  return Promise.reject(err)
})

export default service
