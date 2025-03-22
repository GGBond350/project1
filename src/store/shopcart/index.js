import { reqCartList, reqDeleteCart, reqChangeChecked } from '@/api/index'
const state = {
	shopcartList:[]
}
const actions = {
	//获取数据
	async shopcartList ({commit}){
		const res = await reqCartList()
		if(res.code === 200){
			commit('SHOPCARTLIST',res)
		}
	},
	//删除一项
	async deleteCartList({commit},skuId){
		const res = await reqDeleteCart(skuId)
		if(res.code === 200){
			return 'ok'
		}else{
			return Promise.reject(new Error('failed'))
		}
	},
	//更改选中
	async changeChecked({commit},{skuId,isChecked}){
		const res = await reqChangeChecked(skuId,isChecked)
		if(res.code === 200){
			return 'ok'
		}else{
			return Promise.reject(new Error('failed'))
		}
	},
	//删除所有选中
	deleteAllSelected({dispatch,getters}){
		const list = []
		getters.shopcartInfo.cartInfoList.forEach(i => {
			
			if(i.isChecked===1){
				list.push(dispatch('deleteCartList',i.skuId))
			}
		})
		return Promise.all(list)
	},
	updateAllSelect({dispatch,getters},isChecked){
		const list = []
		getters.shopcartInfo.cartInfoList.forEach(i=>{
			list.push(dispatch('changeChecked',{skuId:i.skuId,isChecked}))
		})
		return Promise.all(list)
	}
}
const mutations ={
	SHOPCARTLIST(state,res){
		state.shopcartList = res.data||[]
	}
}
const getters = {
	shopcartInfo(){
		return state.shopcartList[0]||{}
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}