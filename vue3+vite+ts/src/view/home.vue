<script setup lang="ts">
// import Add from '../components/add.vue'
import Axios from '../utils/api'
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
// defineProps<{ msg: string }>()
const count = ref(0)
const router = useRouter()
const list = reactive([
	{ name: '123', age: 12 },
	{ name: 'zhangsan1', age: 18 },
])
onMounted(() => {
	
})

function topage() {
	router.push('/Login')
}
</script>

<template>
	<div @click="topage">跳转登录</div>
	<div contenteditable>可以输入</div>
	<!-- <Add /> -->
</template>

<style lang='scss' scoped>

</style>
