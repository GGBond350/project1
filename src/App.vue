<template>
  <div>
		<Header></Header>
			<!-- 路由出口的地方 -->
			<router-view></router-view>
		<Footer v-show="$route.meta.show"></Footer>
	</div>
</template>

<script>

import Header from '@/components/Header'
import Footer from './components/Footer/index.vue'
import Vue from 'vue';
import * as API from '@/api'
export default {
  name: 'App',
  components:{
		Header,
		Footer
	},
	beforeCreate(){
		Vue.prototype.$bus = this
		Vue.prototype.$API = API
	},
	mounted() {
		//派发action获取三级列表数据，放在此处是为了只运行一次，减少发送请求
		this.$store.dispatch('categoryList')
	},
}
</script>

<style scoped>

</style>
