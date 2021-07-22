/**
 * 运行接口相关请求
 */

 import request from "./request";


 // 运行单个接口
export const runApi = data => {
  return request({
    method: 'POST', 
    url:'/api/manage/run_api/',
    data
  })
};

// 运行测试用例
export const runCase = data => {
return request({
  method: 'POST', 
  url:'/api/manage/run_case/',
  data
})
};

// 运行测试套件
export const runSuit = data => {
return request({
  method: 'POST', 
  url:'/api/manage/run_suit/',
  data
})
};
 