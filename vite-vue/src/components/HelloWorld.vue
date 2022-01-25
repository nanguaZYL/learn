<template>
	<div class="world">
		<progress max="100" value="5"></progress>
		<el-button @click="changeMap">修改</el-button>
		<div v-for="i in list" :key="i">{{ i }}</div>
		<el-tree
			:data="data"
			show-checkbox
			node-key="id"
			default-expand-all
			:expand-on-click-node="false"
		>
			<!-- eslint-disable -->
			<div class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ data.name }}</span>
				<el-progress
					:percentage="50"
					style="width: 200px; margin-left: 30px"
				></el-progress>
			</div>
		</el-tree>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
			},
			dialogVisible: false,
			data: [
				{
					name: '一级 1',
					children: [
						{
							name: '二级 1-1',
							children: [
								{
									name: '三级 1-1-1',
								},
							],
						},
					],
				},
				{
					name: '一级 2',
					children: [
						{
							name: '二级 2-1',
							children: [
								{
									name: '三级 2-1-1',
								},
							],
						},
						{
							name: '二级 2-2',
							children: [
								{
									name: '三级 2-2-1',
								},
							],
						},
					],
				},
				{
					name: '一级 3',
					children: [
						{
							name: '二级 3-1',
							children: [
								{
									name: '三级 3-1-1',
								},
							],
						},
						{
							name: '二级 3-2',
							children: [
								{
									name: '三级 3-2-1',
								},
							],
						},
					],
				},
			],
			list: [1, 5, 3, 58, 4, 12, 14, 148],
			defaultProps: {
				children: 'children',
				label: 'name',
			},
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!')
		},
		changeMap() {
			// this.list[1] = 100
			this.$set(this.list, 1, 100)
		},
		open() {
			debugger
			this.dialogVisible = true
		},
		cancel() {
			this.dialogVisible = false
			this.$nextTick(() => {
				this.$refs.form.resetFields()
				this.form = this.$options.data().form
			})
		},
		handleNodeClick(data) {
			console.log(data)
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then((_) => {
					done()
				})
				.catch((_) => {})
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
</style>
