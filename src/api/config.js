/**
 * 环境变量相关请求
 */
 import request from "./request";


 export const addConfig = data => {
 return request({
   method: 'POST', 
   url:'/api/manage/config/',
   data
 })
 };
 
 export const updateConfig = data => {
 return request({
   method: 'PATCH',
   url: '/api/manage/config/',
   data
 })
 }
 
 export const deleteConfig = params => {
 return request({
   method: 'DELETE',
   url: '/api/manage/config/',
   params
 })
 }
 
 export const queryConfig = params => {
 return request({
   method: 'GET',
   url: '/api/manage/config/',
   params
 })
 }
 