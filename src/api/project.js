/**
 * 项目管理相关请求
 */
import request from "./request";


// 增删改查
export const addProject = data => {
  return request({
    method: 'POST', 
    url:'/api/manage/project/',
    data
  })
};
 
export const updateProject = data => {
  return request({
    method: 'PATCH',
    url: '/api/manage/project/',
    data
  })
}

export const deleteProject = params => {
  return request({
    method: 'DELETE',
    url: '/api/manage/project/',
    params
  })
}

export const queryProject = params => {
  return request({
    method: 'GET',
    url: '/api/manage/project/',
    params
  })
}
