import request from '@/utils/request'

// 登录
export function userLogin (query) {
  return request({
    url: '/user/login',
    method: 'post',
    data: query
  })
}

// 登出
export function userLogout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 注册
export function userRegister (data) {
  return request({
    url: '/user/register',
    method: 'post',
    params: data
  })
}

// 获取验证码
export function getVerifyCode (query) {
  return request({
    url: '/getVerifyCode',
    method: 'post',
    data: query
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/user/getUserInfo',
    method: 'post'
  })
}
