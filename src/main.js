import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from './router'
//引入store
import store from './store'
//全局组件
import TypeNav from './components/TypeNav/index.vue'
import Carousel from './components/Carousel/index.vue'
import Pagination from './components/Pagination/index.vue'
//引入mock
import '@/mock/mockServe'
//eleUI
import { Button, Loading, MessageBox } from 'element-ui';
//引入swiper样式
import 'swiper/css/swiper.css'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//注册全局
Vue.component(Button.name, Button);
//或者挂载到原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert= MessageBox.alert
import load from '@/assets/images/1.gif'
Vue.use(VueLazyload,{
	loading:load
})

new Vue({
  render: h => h(App),
	//注册路由
	router, 
	store
	
}).$mount('#app')

