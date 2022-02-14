<template>
	<div style="padding: 15px">
		<p>标题</p>
		<div v-for="(item, index) in list" :key="index" class="list">
			<input
				type="text"
				:style="getValue(item, index)"
				v-model="item.value"
				@input="changeNum($event, item, index)"
			/>
			<input
				type="text"
				v-model="item.money"
				@input="changeM(item, index)"
			/>
			<span class="add" @click="add(index)">+</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					value: 1,
					money: 0,
				},
			],
		}
	},
	methods: {
		changeNum(e, v, i) {
			console.log(e.target.value, v, i)
			v.value = e.target.value
			// this.$set(this.list,i)
			console.log()
		},
		changeM(v, i) {
			console.log(v, i)
		},
		getValue(v, i) {
			console.log(v, i)
		},
		add(i) {
			let item = this.list[this.list.length - 1]
			this.list.push({
				value: 1 + Number(item.value),
				money: 0,
			})
		},
	},
}
</script>

<style scoped>
.world {
	padding: 20px;
}
a {
	color: #42b983;
}
.custom-tree-node {
	width: 100%;
	display: flex;
	align-items: center;
}
input {
	outline: none;
	padding: 8px 2px;
	border-radius: 8px;
	width: 100px;
	border: 1px solid #ccc;
}
.add {
	margin-left: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border: 1px solid #ccc;
}
.list {
	display: flex;
	align-items: center;
}
</style>
