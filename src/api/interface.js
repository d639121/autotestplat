/**
 * 基础接口相关请求
 */
import request from "./request";


export const addInterface = data => {
  return request({
    method: 'POST', 
    url:'/api/manage/interface/',
    data
  })
};

export const updateInterface = data => {
  return request({
    method: 'PATCH',
    url: '/api/manage/interface/',
    data
  })
}

export const deleteInterface = params => {
  return request({
    method: 'DELETE',
    url: '/api/manage/interface/',
    params
  })
}

export const queryInterface = params => {
  return request({
    method: 'GET',
    url: '/api/manage/interface/',
    params
  })
}

export const copyInterface = data => {
return request({
  method: 'POST',
  url: '/api/manage/interface/copy/',
  data
})
}
 
export const updateStatus = data => {
  return request({
    method: 'POST',
    url: '/api/manage/interface/update_status/',
    data
  })
  }
