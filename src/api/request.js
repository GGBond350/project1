import axios from "axios";
//导入进度条
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import store from "@/store";
//创建axios实例
const requsets = axios.create({
	baseURL:'http://gmall-h5-api.atguigu.cn/api',
	timeout:5000
})
//请求拦截器
requsets.interceptors.request.use((config)=>{
	//进度条开始
	nprogress.start()
	if(store.state.detail.uuid_token){
		config.headers.userTempId = store.state.detail.uuid_token
	}
	if(store.state.user.token){
		config.headers.token = store.state.user.token
	}
	return config
})
//响应拦截器
requsets.interceptors.response.use((res)=>{
	//进度条结束
	nprogress.done()
	return res.data
},(err)=>{
	return Promise.reject(new Error(err))
})


export default requsets