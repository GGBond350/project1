<template>

	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="slide in list" :key="slide.id">
				<img :src="slide.imgUrl">
			</div>

		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>

</template>

<script>
import Swiper from 'swiper'
export default {
	name: 'Carousel',
	props: ['list'],
	watch: {
		immediate: true,
		list: {
			handler() {
				this.$nextTick(() => {
					var mySwiper = new Swiper('.swiper-container', {
						loop: true,
						pagination: {
							el: '.swiper-pagination',
							clickable: true
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEL: '.swiper-button-prev',
						}
					})
				})
			}
		}
	}
}
</script>

<style scoped></style>