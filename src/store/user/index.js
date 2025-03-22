import { reqPhoneCode, reqUserRegister, reqUserLogin, reqUserInfo,reqUserLogout } from '@/api/index'
const state = {
	code: '',
	token: localStorage.getItem('TOKEN'),
	userInfo: {}
}
const actions = {
	async getCode({ commit }, phone) {
		const res = await reqPhoneCode(phone)

		if (res.code === 200) {
			commit('GETCODE', res)
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async userRegister({ commit }, data) {
		const res = await reqUserRegister(data)
		if (res.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async userLogin({ commit }, data) {

		const res = await reqUserLogin(data)

		if (res.code === 200) {
			commit('USERLOGIN', res.data.token)
			localStorage.setItem('TOKEN', res.data.token)
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	//获取用户信息
	async userInfo({ commit }) {
		const res = await reqUserInfo()
		if (res.code === 200) {
			commit('USERINFO', res.data)
			return 'ok'
		}else{
			return Promise.reject(new Error('failed'))
		}
	},
	async userLogout({commit}){
		const res = await reqUserLogout()
		if(res.code === 200){
			commit('USERLOGOUT')
			return 'ok'
		}else {
			return Promise.reject(new Error('failed'))
		}
	},
	

}
const mutations = {
	GETCODE(state, res) {
		state.code = res.data
	},
	USERLOGIN(state, token) {
		state.token = token
	},
	USERINFO(state, info) {
		state.userInfo = info
	},
	USERLOGOUT(state){
		state.token=''
		state.userInfo = {}
		localStorage.setItem('TOKEN','')
	}
}
const getters = {}
export default {
	state,
	actions,
	mutations,
	getters
}