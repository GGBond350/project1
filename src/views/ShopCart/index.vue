<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="changeChecked(cart, $event)">
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl">
						<div class="item-msg">{{ cart.skuName }}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{ cart.skuPrice }}.00</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="change('sub', -1, cart)">-</a>
						<input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
							@change="change('mid', $event.target.value * 1, cart)">
						<a href="javascript:void(0)" class="plus" @click="change('add', 1, cart)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cart.skuNum * cart.skuPrice }}.00</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="deleteCart(cart)">删除</a>
						<br>
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
					@change="updateAllSelect($event)">
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="deleteAll">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择
					<span>{{ total.count }}</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ total.price }}.00</i>
				</div>
				<div class="sumbtn">
					<a class="sum-btn" @click="goTrade">结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'
export default {
	name: 'ShopCart',
	mounted() {
		this.getData()
	},
	computed: {
		...mapGetters(['shopcartInfo']),
		cartInfoList() {
			return this.shopcartInfo.cartInfoList || []
		},

		//已选总数和总价
		total() {
			let price = 0
			let count = 0
			this.cartInfoList.forEach(i => {
				if (i.isChecked === 1) {
					count += i.skuNum
					price += i.skuPrice * i.skuNum
				}

			})
			return { price, count }
		},
		isAllChecked() {
			return this.cartInfoList.every(i => i.isChecked === 1)
		},
	},
	methods: {
		getData() {
			this.$store.dispatch('shopcartList')
		},
		async changeChecked(cart, event) {
			const isChecked = event.target.checked ? '1' : '0'
			try {
				await this.$store.dispatch('changeChecked', { skuId: cart.skuId, isChecked })
				this.getData()
			} catch (error) {
				alert(error.message)
			}
		},
		//更改商品数量
		change: throttle(async function (tag, num, cart) {
			switch (tag) {
				case 'sub':
					num = cart.skuNum > 1 ? -1 : 0
					break
				case 'add':
					num = 1
					break
				case 'mid':
					if (isNaN(num) || num < 1) {
						num = -cart.skuNum + 1
					} else {
						num = parseInt(num) - cart.skuNum
					}
					break
			}
			try {
				await this.$store.dispatch('addToCart', { skuId: cart.skuId, skuNum: num })
				this.getData()
			} catch (error) {
				console.log(error);
			}
		}, 500),
		//删除购物项
		async deleteCart(cart) {
			try {
				await this.$store.dispatch('deleteCartList', cart.skuId)
				this.getData()
			} catch (error) {
				alert(error.message)
			}

		},
		//删除选中的
		async deleteAll() {
			try {
				await this.$store.dispatch('deleteAllSelected')
				this.getData()
			} catch (error) {
				alert(error.message)
			}
		},
		//全选反选
		async updateAllSelect(event) {
			
			let isChecked =  event.target.checked?'1':'0'
			if(this.cartInfoList.length<1) return
			try {
				await this.$store.dispatch('updateAllSelect',isChecked)
				this.getData()
			} catch (error) {
				alert(error.message)
			}

		},
		//跳转到结算界面
		goTrade(){
			
			localStorage.setItem('trade',true)
			this.$router.push('/trade')
		}
	},
}
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;

	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}

	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;

			&>div {
				float: left;
			}

			.cart-th1 {
				width: 25%;

				input {
					vertical-align: middle;
				}

				span {
					vertical-align: middle;
				}
			}

			.cart-th2 {
				width: 25%;
			}

			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;

			}
		}

		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;

			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;

				&>li {
					float: left;
				}

				.cart-list-con1 {
					width: 15%;
				}

				.cart-list-con2 {
					width: 35%;

					img {
						width: 82px;
						height: 82px;
						float: left;
					}

					.item-msg {
						float: left;
						width: 150px;
						margin: 0 10px;
						line-height: 18px;
					}
				}

				.cart-list-con4 {
					width: 10%;

				}

				.cart-list-con5 {
					width: 17%;

					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}

					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 33px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}
				}

				.cart-list-con6 {
					width: 10%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 13%;

					a {
						color: #666;
					}
				}
			}
		}
	}

	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;

				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: "Microsoft YaHei";
					background: #e1251b;
					overflow: hidden;
				}
			}
		}
	}
}
</style>