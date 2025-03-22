<template>
	<div class="pagination">
		<button :disabled="pageNo<=1" @click="change(pageNo-1)">上一页</button>
		<button v-show="startAndEnd.start >1"  @click="change(1)" :class="{'active':pageNo==1}">1</button>
		<button v-show="startAndEnd.start >2" @click="change(2)" :class="{'active':pageNo==2}">2</button>
		<button v-show="startAndEnd.start >3">···</button>


		<button v-for="(i, index) in between" :key="index" @click="change(i)" :class="{'active':pageNo==i}">{{i}}</button>



		<button v-show="startAndEnd.end <= totalPage - 2">···</button>
		<button v-show="startAndEnd.end < totalPage-1" @click="change(totalPage-1)" :class="{'active':pageNo==totalPage-1}">{{ totalPage-1 }}</button>
		<button v-show="startAndEnd.end < totalPage" @click="change(totalPage)" :class="{'active':pageNo==totalPage}">{{ totalPage }}</button>
		<button :disabled="pageNo>=totalPage" @click="change(pageNo+1)">下一页</button>

		<button style="margin-left: 30px">共 {{ total }} 条</button>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	props: ['continues', 'total', 'pageSize', 'pageNo'],
	computed: {
		totalPage() {
			return Math.ceil(this.total / this.pageSize)
		},
		startAndEnd() {
			let start = 0
			let end = 0
			const interval = parseInt(this.continues / 2)
			if (this.totalPage <= this.continues) {
				start = 1
				end = this.totalPage
			} else {
				start = this.pageNo - interval
				end = this.pageNo + interval
			}
			if (start < 1) {
				start = 1
				end = this.continues
			}
			if (end > this.totalPage) {
				end = this.totalPage
				start = this.totalPage - this.continues + 1
			}
			return { start, end }
		},
		between() {
			const res = []
			for (let i = this.startAndEnd.start; i <= this.startAndEnd.end; i++) {
				res.push(i)
			}
			return res
		}

	},
	methods:{
		//改变当前页
		change(num){ 
			this.$emit('changePage',num)
		}
	}
}
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;

	button {
		margin: 0 5px;
		background-color: #f4f4f5;
		color: #606266;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
.active{
	background: skyblue;
}
</style>
