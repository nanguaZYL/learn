import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	RouteRecordRaw,
} from 'vue-router'
// createWebHashHistory hash模式
// createWebHistory history模式

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/Home',
	},
	{
		path: '/Home',
		component: () => import('../view/home.vue'),
		meta: {
			title: '首页',
		},
	},
	{
		path: '/Login',
		component: () => import('../view/login.vue'),
		meta: {
			title: '登录',
		},
	},
]

const asyncRoutes = []

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
