/**
 * 测试套件相关请求
 */
import request from "./request";


export const addSuit = data => {
  return request({
    method: 'POST', 
    url:'/api/manage/suit/',
    data
  })
};

export const updateSuit = data => {
  return request({
    method: 'PATCH',
    url: '/api/manage/suit/',
    data
  })
}

export const deleteSuit = params => {
  return request({
    method: 'DELETE',
    url: '/api/manage/suit/',
    params
  })
}

export const querySuit = params => {
  return request({
    method: 'GET',
    url: '/api/manage/suit/',
    params
  })
}
 