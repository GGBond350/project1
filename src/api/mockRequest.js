import axios from "axios";
//导入进度条
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
//创建axios实例
const mockRequsets = axios.create({
	baseURL:'/mock',
	timeout:5000
})
//请求拦截器
mockRequsets.interceptors.request.use((config)=>{
	//进度条开始
	nprogress.start()
	return config
})
//响应拦截器
mockRequsets.interceptors.response.use((res)=>{
	//进度条结束
	nprogress.done()
	return res.data
},(err)=>{
	return Promise.reject(new Error(err))
})


export default mockRequsets