<template>
	<div>
		<TypeNav :show="true"></TypeNav>
		<ListContainer></ListContainer>
		<Recommend></Recommend>
		<Rank></Rank>
		<Like></Like>
		<Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor>
		<Brand></Brand>
	</div>


</template>

<script>
import ListContainer from './ListContainer/index.vue'
import TypeNav from '@/components/TypeNav'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import { mapState } from 'vuex'
export default {
	name: '',
	components: {
		ListContainer,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand,
	},
	computed:{
		...mapState({
			floorList:(state)=>state.home.floorList
		})
	},
	mounted(){
		this.$store.dispatch('getFloorList')
	}
}
</script>

<style scoped></style>