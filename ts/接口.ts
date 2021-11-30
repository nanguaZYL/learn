// interface  接口最直观的体现就是可以约定一个接口当中具体有哪些成员以及这些成员的类型是什么样的
// 接口就是约束对象的结构
export {}

// 可选成员

interface Post {
	title: string
	content: string
	order: number
	subtitle?: string
	readonly summary: string
}

function printPost(post: Post): void {
	console.log(post.title)
	console.log(post.content)
	console.log(post.order)
}
printPost({
	title: '标题',
	content: '这是一段内容',
	order: 15,
	subtitle: '可有可无的副标题',
	summary: '只读成员',
})

// 动态成员
interface Cache {
	[key: string]: string
}
const cache: Cache = {}
cache.foo = 'value' //可任意添加属性 不过键值必须为string类型
