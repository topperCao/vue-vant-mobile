import request from '@/utils/request'

export function loginUser (query) {
  return request({
    url: '/user/login',
    method: 'post',
    data: query
  })
}

export function logoutUser () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo () {
  return request({
    url: '/user/getUserInfo',
    method: 'post'
  })
}
