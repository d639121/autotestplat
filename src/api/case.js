/**
 * 测试用例相关请求
 */
import request from "./request";


export const addCase = data => {
return request({
  method: 'POST', 
  url:'/api/manage/case/',
  data
})
};

export const updateCase = data => {
return request({
  method: 'PATCH',
  url: '/api/manage/case/',
  data
})
}

export const deleteCase = params => {
return request({
  method: 'DELETE',
  url: '/api/manage/case/',
  params
})
}

export const queryCase = params => {
return request({
  method: 'GET',
  url: '/api/manage/case/',
  params
})
}
