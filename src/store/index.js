import Vuex from 'vuex'
import Vue from 'vue'
import home from './home'
import search from './search'
import detail from './detail/index.js'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
//使用vuex
Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		home,
		search,
		detail,
		shopcart,
		user,
		trade
	}
})