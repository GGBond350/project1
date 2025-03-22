import requsets from './request.js'
import mockRequsets from './mockRequest.js'
//请求三级列表地址/api/product/getBaseCategoryList
const reqCategoryList = () => {
	return requsets({
		url: '/product/getBaseCategoryList',
		method: 'get',
	})
}
const reqBanner = ()=>{
	return mockRequsets.get('/banner')
}
const reqFloor = ()=>{
	return mockRequsets.get('/floor')
}
const reqSearchInfo = (params)=>{
	return requsets({
		url: '/list',
		method:'post',
		data:params
	})
}
const reqDetailInfo = (params)=>{
	return requsets({
		url: `/item/${params}`,
		method:'get',
	})
}
const reqAddToCart = ({skuId,skuNum})=>{
	return requsets({
		url:`/cart/addToCart/${skuId}/${skuNum}`,
		method:'post'
	})
}
const reqCartList = ()=>{
	return requsets({
		url:'/cart/cartList',
		method:'get'
	})
}
const reqDeleteCart = (skuId)=>{
	return requsets({
		url:`/cart/deleteCart/${skuId}`,
		method:'delete'
	})
}
const reqChangeChecked = (skuId,isChecked)=>{
	return requsets({
		url:`/cart/checkCart/${skuId}/${isChecked}`,
		method:'get'
	})
}
//获取手机验证码
const reqPhoneCode = (phone)=>{
	return requsets({
		url:`/user/passport/sendCode/${phone}`,
		method:'get'
	})
}
//注册
const reqUserRegister = (data)=>{
	return requsets({
		url:`/user/passport/register`,
		data,
		method:'post'
	})
}
//登录
const reqUserLogin = (data)=>{
	return requsets({
		url:`/user/passport/login`,
		data,
		method:'post'
	})
}
//获取用户信息
const reqUserInfo = ()=>{
	
	return requsets({
		url:`user/passport/auth/getUserInfo`,
		method:'get'
	})
}
const reqUserLogout = ()=>{
	return requsets({
		url:`/user/passport/logout`,
		method:'get'
	})
}
const reqAddressInfo = ()=>{
	return requsets({
		url:`/user/userAddress/auth/findUserAddressList`,
		method:'get'
	})
}
const reqOrderInfo = ()=>{
	return requsets({
		url:`/order/auth/trade`,
		method:'get'
	})
}
const reqSubmitOrder = (tradeNo,data)=>{
	return requsets({
		url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
		data,
		method:'post'
	})
}
const reqPayInfo = (orderId)=>{
	return requsets({
		url:`/payment/weixin/createNative/${orderId}`,
		method:'get'
	})
}
const reqPayStatus = (orderId)=>{
	return requsets({
		url:`/payment/weixin/queryPayStatus/${orderId}`,
		method:'get'
	})
}
const reqMyorderList = (page,limit)=>{
	
	return requsets({
		url:`order/auth/${page}/${limit}`,
		method:'get'
	})
}



export {reqCategoryList,reqBanner,reqFloor,reqSearchInfo,reqDetailInfo,reqAddToCart,reqCartList,reqDeleteCart,reqChangeChecked,reqPhoneCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout,reqAddressInfo, reqOrderInfo,reqSubmitOrder,reqPayInfo,reqPayStatus,reqMyorderList}