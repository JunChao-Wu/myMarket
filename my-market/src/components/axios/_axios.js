import axios from 'axios';

let _axios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// /* 请求的拦截处理 */
// _axios.interceptors.request.use(config => {
//   return config
// }, err)

// /* 接收的拦截处理 */
// _axios.interceptors.response.use((response) => {
//   const res = response.data;
//   if(res.code !== 1 && res.code !== 200) {
//     console.log(res.message || res.msg)
//     if(res.code === 401 || res.code ===403 || res.code === 999) {
//       console.log('验证身份失败')
//     }
//     return Promise.reject('error')
//   } else {
//     return res
//   }
// }, err)

// /* 错误处理 */
// const err = (error) => {
//   if(error.response) {
//     const data = error.response.data;
//     if(error.response.status === 403) {
//       /* 403 处理 */
//       console.log(data.message || data.msg)
//     }
//     if(error.response.status === 401) {
//       /* 401 处理 */
//       console.log('身份验证失败')
//     }
//   }
//   return Promise.reject(error)
// }




export default _axios;