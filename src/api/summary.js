import request from './request'


const api = '/api/manage/summary/'

export const deleteSummary = params => {
  return request({
    method: 'DELETE',
    url: api,
    params
  })
}

export const querySummary = params => {
  return request({
    method: 'GET',
    url: api,
    params
  })
}

export const summaryDetail = params => {
return request({
  method: 'GET',
  url: '/api/manage/summary/detail/',
  params
})
}
