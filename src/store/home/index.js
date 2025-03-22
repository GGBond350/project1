import { reqCategoryList, reqBanner, reqFloor } from "@/api"
//home仓库
const state = {
	categoryList: [],
	bannerList: [],
	floorList: []
}
const actions = {
	//第一个参数表示的是store对象
	async categoryList({ commit }) {
		const res = await reqCategoryList()
		if (res.code === 200) {
			commit('CATEGORYLIST', res)
		}
	},
	async getBannerList({ commit }) {
		const res = await reqBanner()
		if (res.code === 200) {
			commit('BANNERLIST', res)
		}
	},
	async getFloorList({ commit }) {
		const res = await reqFloor()
		if (res.code === 200) {
			commit('FLOORLIST', res)
		}
	},
	

}
const mutations = {
	CATEGORYLIST(state, res) {
		state.categoryList = res.data
	},
	BANNERLIST(state,res){
		state.bannerList = res.data
	},
	FLOORLIST(state,res){
		state.floorList = res.data
	},

}
const getters = {}
export default {
	state,
	actions,
	mutations,
	getters
}