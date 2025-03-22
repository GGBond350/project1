import {reqAddressInfo, reqOrderInfo} from '@/api/index'
const state ={
	addressInfo:[],
	orderInfo:{},
}
const actions ={
	//获取用户收货地址信息
	async addressInfo ({commit}){
		const res = await reqAddressInfo()
		if(res.code===200){
			commit('ADDRESSINFO',res.data)
		}
	},
	async orderInfo ({commit}){
		const res = await reqOrderInfo()
		if(res.code===200){
			commit('ORDERINFO',res.data)
		}
	},

}
const mutations ={
	ADDRESSINFO(state,data){
		state.addressInfo = data
	},
	ORDERINFO(state,data){
		state.orderInfo = data
	}
}
const getters = {
}
export default {
	state,
	actions,
	mutations,
	getters
}