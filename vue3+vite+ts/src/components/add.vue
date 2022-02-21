<script setup lang="ts">
import { ref } from 'vue'
// 定义props的接口
interface Props {
	msg?: string
}
withDefaults(defineProps<Props>(), {
	msg: '没有的默认标题',
})

const count = ref(0)
function add() {
	count.value++
	console.log(count.value)
}
</script>

<template>
	<h1>{{ msg }}</h1>
	<p>count:{{ count }}</p>
	<button @click="add">+</button>
</template>

<style scoped>
a {
	color: #42b983;
}

label {
	margin: 0 0.5em;
	font-weight: bold;
}

code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
</style>
