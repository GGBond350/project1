import { reqDetailInfo, reqAddToCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
	detailInfo: {},
	uuid_token: getUUID()
}
const actions = {
	async detailInfo({ commit }, id) {
		// console.log(typeof id);
		const res = await reqDetailInfo(id)
		if (res.code === 200) {
			commit('DETAILINFO', res)
		}
	},
	async addToCart({ commit }, params) {
		
		const res = await reqAddToCart(params)
		if (res.code === 200) {
			return 'ok'
		}else{
			return Promise.reject(new Error('fail'))
		}
	}
}
const mutations = {
	DETAILINFO(state, res) {
		state.detailInfo = res.data
	}
}
const getters = {
	categoryView(state) {
		return state.detailInfo.categoryView || {}
	},
	skuInfo(state) {
		return state.detailInfo.skuInfo || {}
	},
	spuSaleAttrList(state) {
		return state.detailInfo.spuSaleAttrList || []
	}
}
export default {
	state,
	actions,
	mutations,
	getters
}