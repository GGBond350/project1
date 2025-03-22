<template>
	<!-- 商品分类导航 -->
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="mouseLeave" @mouseenter="toShow">
				<h2 class="all">全部商品分类</h2>
				<!-- 过渡动画 -->
				<transition name="sort">
					<div class="sort" v-show="isShow">
					<div class="all-sort-list2" @click="goSearch">
						<div class="item" v-for="(item, index) in categoryList" :key="item.categoryId"
							:class="{ cur: curIndex === index }">
							<h3 @mouseenter="changeIndex(index)">
								<a :data-category-Name="item.categoryName" :data-category1-Id="item.categoryId">{{ item.categoryName }}</a>
							</h3>
							<div class="item-list clearfix">
								<div class="subitem">
									<dl class="fore" v-for="(subitem) in item.categoryChild" :key="subitem.categoryId">
										<dt>
											<a :data-category-Name="subitem.categoryName" :data-categor2-Id="subitem.categoryId">{{ subitem.categoryName }}</a>
										</dt>
										<dd>
											<em v-for="i in subitem.categoryChild" :key="i.categoryId">
												<a :data-category-Name="i.categoryName" :data-category3-Id="i.categoryId">{{ i.categoryName }}</a>
											</em>

										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
				</transition>
			</div>

			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
	name: 'TypeNav',
	//show表示该组件的侧栏默认是否显示
	props:['show'],
	
	data() {
		return {
			curIndex: -1,
			isShow:this.show
		}
	},
	methods: {

		changeIndex: throttle(function (index) {
			console.log('进入了' + index);
			this.curIndex = index
		}, 50),
		mouseLeave() {
			this.curIndex = -1
			
				this.isShow = this.show
			
		},
		goSearch(e) {
			let { categoryName, category1Id,category2Id,category3Id } = e.target.dataset
			if(categoryName){
				let location = {name:'search'}
				let query = {categoryName:categoryName}
				if(category1Id){
					query.category1Id = category1Id
					
				}else if(category2Id){
					query.category2Id = category2Id
					
				}else{
					query.category3Id = category3Id
				}
				location.query = query
				if(this.$route.params){
					location.params = this.$route.params
				}
				this.$router.push(location)
			}
		},
		toShow(){
			if(!this.isShow){
				this.isShow = true
			}
		}

	},
	computed: {
		...mapState({
			categoryList: state => state.home.categoryList

		})
	}
}
</script>

<style scoped lang="less">
.type-nav {
	border-bottom: 2px solid #e1251b;

	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 461px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}


					&:hover {
						.item-list {
							display: block;
						}
					}
				}

				.cur {
					background: skyblue;
				}
			}
		}
		//过渡动画开始状态
		.sort-enter{
			height: 0;
		}
		//过渡动画结束状态
		.sort-enter-to{
			height: 461px;
		}
		//动画的时间速率
		.sort-enter-active{
			transition: all .5s linear;
		}
	}
}
</style>