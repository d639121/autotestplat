import axios from 'axios'
import JSONbig from 'json-bigint'



// if( process.env.NODE_ENV === "production" ){
//   baseUrl = "http://127.0.0.1:8000";
// }

const request = axios.create({

  baseURL: 'http://127.0.0.1:8005/',

  transformResponse: [function (data) {
    
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})

// export可以导出多个模块，erport default只可以导出一个默认模块；
// 一个js文件中，只能有一个export default，但是可以又多个export；
// 导入时方式不一样， export 需要加 {}
export default request;
