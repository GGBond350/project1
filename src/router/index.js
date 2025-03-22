//配置路由

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//使用插件

Vue.use(VueRouter)

//配置路由
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register/index.vue'
import Detail from '@/views/Detail/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart/index.vue'
import Trade from '@/views/Trade/index.vue'
import Pay from '@/views/Pay/index.vue'
import PaySuccess from '@/views/PaySuccess/index.vue'
import GroupOrder from './../views/Center/GroupOrder/index.vue'
import MyOrder from './../views/Center/MyOrder/index.vue'
import Center from './../views/Center/index.vue'
let oldPush = VueRouter.prototype.push
let odlReplace = VueRouter.prototype.replace;
//重写push|replace方法去解决多次点击
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		oldPush.call(this, location, resolve, reject)
	} else {
		oldPush.call(this, location, () => { }, () => { })
	}
}

VueRouter.prototype.replace = function (location, resolve, reject) {
	if (resolve && reject) {
		odlReplace.call(this, location, resolve, reject)
	} else {
		odlReplace.call(this, location, () => { }, () => { })
	}
}




let router =  new VueRouter({
	//配置路由
	routes: [
		//meta是路由元信息 显示footer
		{ path: '/center', component: Center, meta: { show: true },children:[{path: 'myorder',component: MyOrder},{path: 'grouporder',component: GroupOrder},{path:'/center',redirect:'/center/myorder'}] },
		{ path: '/paysuccess', component: PaySuccess, meta: { show: true },name:'paysuccess',beforeEnter:(to,from,next)=>{
			if(from.path==='/pay'||from.path==='/'&&localStorage.getItem('paysuccess')){
				next()
			}else{
				next(false)
			}
		} },
		{ path: '/pay', component: Pay, meta: { show: true },name:'pay',beforeEnter:(to,from,next)=>{
			if(from.path==='/trade'||from.path==='/'&&localStorage.getItem('pay')){
				
				next()
			}else{
				next(false)
			}
		} },
		{ path: '/trade', component: Trade, meta: { show: true },name:'trade',beforeEnter:(to,from,next)=>{
			if(from.path==='/shopcart'||from.path==='/'&&localStorage.getItem('trade')){
				next()
			}else{
				next(false)
			}
		} },
		{ path: '/shopcart', component: ShopCart, meta: { show: true },name:'shopcart' },
		{ path: '/addcartsuccess', component: AddCartSuccess, meta: { show: true },name:'addcartsuccess' },
		{ path: '/detail/:skuid', component: Detail, meta: { show: true } },
		{ path: '/home', component: Home, meta: { show: true } },
		{ path: '/search/:keywords?', component: Search, meta: { show: true }, name: 'search' },
		{ path: '/login', component: Login, meta: { show: false } },
		{ path: '/register', component: Register, meta: { show: false } },
		{ path: '/', redirect: '/home' }
	],
	scrollBehavior(to, from, savePosition) {
		return { y: 0 }
	}
})

router.beforeEach(async (to,from,next)=>{
	const token = store.state.user.token
	const userInfo = store.state.user.userInfo
	if(token){
		if(to.path==='/login'){
			next(false)
		}else{
			if(!userInfo.name){
				try {
					await store.dispatch('userInfo')
					next()
				} catch (error) {
					//token失效
					await store.dispatch('userLogout')
					next('/login')
				}
				//有userInfo
			}else{
				next()
			}
			
		}
		//未登录
	}else{
		let toPath = to.path
		//未登录不能去，订单、支付、我的订单页面
		if(toPath.indexOf('/center')!==-1||toPath.indexOf('/trade')!==-1||toPath.indexOf('/pay')!==-1){
			//把登录前要去的地址保存在路由地址中
			next('/login?redirect='+toPath)
		}else{//去的页面不需要登录
			next()
		}
	}
})






export default router