export {} //避免与其他示例有成员冲突
// 基础类型---------------------------------------------------
// 字符串类型
const str: string = 'hello world'

// 数字类型
const num: number = 20

// 布尔类型
const bool: boolean = true

// null 个人感觉意义不大
const n: null = null

// undefined
const u: undefined = undefined

// any 可以是任何类型
let notSure: any = 4

// void 当函数没有返回值时
function getDate(): void {
	console.log('void')
}

// Never  never类型表示的是那些永不存在的值的类型  抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
	throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
	return error('Something failed')
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
	while (true) {}
}

// 引用类型---------------------------------------------------
// 数组
// 1.Array<类型>
const arr1: Array<number> = [1, 2, 3, 4]

// 2.类型[]
const arr2: number[] = [1, 2, 3, 4]

// 元组
const tuple: [number, string] = [18, 'szc']
const [age, name] = tuple // age 18  name szc

// Object 不单指对象类型 在ts中泛指所有的非原始类型 对象 数组 函数等
const foo: object = function () {} //[]  {}
const obj: {} = { foo: 123, bar: 'string' }

// 枚举 enum 默认是从0开始 即success=0 fail=1 continue=2
enum Status {
	success,
	fail,
	continue,
}
// 也可以为字符串
enum Color {
	red = '红色',
	green = '绿色',
	yellow = '黄色',
}

// 函数
function func(a: number, b: number = 10): string {
	return 'func'
}
func(100)
// 隐式类型推断
const func1 = function (a: number): string {
	return 'func1'
}
