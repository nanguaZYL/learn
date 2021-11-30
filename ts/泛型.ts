export {}
// 泛型  指我们在定义函数 接口 类的时候 我们没有指定具体类型 在使用时再传递一个具体类型

function createNumberArray(len: number, value: number): number[] {
	const arr = Array<number>(len).fill(value)
	return arr
}

const res = createNumberArray(3, 100)
console.log(res)

// 泛型
function createArray<T>(len: number, value: T): T[] {
	const arr = Array<T>(len).fill(value)
	return arr
}

const res1 = createArray<string>(3, 'f')
