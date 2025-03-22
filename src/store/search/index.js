//search仓库
import { reqSearchInfo } from '@/api/index'
const state = {
	searchInfo: {}
}
const actions = {
	async getSearchInfo({ commit }, params) {
		const res = await reqSearchInfo(params)
		if (res.code === 200) {
			commit('SEARCHINFO', res.data)
		}
	}
}
const mutations = {
	SEARCHINFO(state,searchInfo){
		state.searchInfo = searchInfo
	}
}
const getters = {
	goodsList(state){
		return state.searchInfo.goodsList||[]
	},
	attrsList(state){
		return state.searchInfo.attrsList||[]
	},
	trademarkList(state){
		return state.searchInfo.trademarkList||[]
	},
	
}
export default {

	state,
	actions,
	mutations,
	getters
}