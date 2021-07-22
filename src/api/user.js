/**
 * 用户相关请求
 */

import request from "./request";


// 登录
export const login = data => {
  return request({
    method: 'POST', 
    url:'/api/user/login/',
    data
  })
};

export const register = data => {
  return request({
    method: 'POST',
    url: '/api/user/register',
    data
  })
}

export const getUserInfo = params => {
  return request({
    method: 'get',
    url: '/api/user/getUserInfo/',
    params
  })
}
