/**
 * 项目管理相关请求
 */
 import request from "./request";


const api = '/api/manage/variable/'

// 增删改查
export const addVariable = data => {
  return request({
    method: 'POST', 
    url: api,
    data
  })
};

export const updateVariable = data => {
  return request({
    method: 'PATCH',
    url: api,
    data
  })
}

export const deleteVariable = params => {
  return request({
    method: 'DELETE',
    url: api,
    params
  })
}

export const queryVariable = params => {
  return request({
    method: 'GET',
    url: api,
    params
  })
}
