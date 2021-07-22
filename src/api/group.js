/**
 * 分组相关请求
 */
import request from "./request";


export const addGroup = data => {
  return request({
    method: 'POST', 
    url:'/api/manage/group/',
    data
  })
};

export const updateGroup = data => {
  return request({
    method: 'PATCH',
    url: '/api/manage/group/',
    data
  })
}

export const deleteGroup = params => {
  return request({
    method: 'DELETE',
    url: '/api/manage/group/',
    params
  })
}

export const queryGroup = params => {
  return request({
    method: 'GET',
    url: '/api/manage/group/',
    params
  })
}
