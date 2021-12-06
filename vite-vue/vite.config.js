import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')
import { resolve } from 'path'

// vite.config.js
export default defineConfig({
	publicDir: '/',
	plugins: [
		createVuePlugin({
			vueTemplateOptions: {},
		}),
	],
	resolve: {
		extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
		alias: {
			// vue2项目别名一般都是@，vue3中一般使用/@/, 为方便使用
			'@': resolve('src'),
			'~@': resolve('src'),
		},
	},
	server: {
		port: '3000',
		host: '0.0.0.0',
		proxy: {
			// "/rep":"https://jsonplaceholder.typicode.com"
			'/rep': {
				target: 'https://jsonplaceholder.typicode.com', // 凡是遇到 /api 路径的请求，都映射到 target 属性
				changeOrigin: true,
			},
		},
	},
	//生产模式打包配置
	// build: {
	// 	outDir: 'dist', //Specify the output directory (relative to project root).
	// },
})
