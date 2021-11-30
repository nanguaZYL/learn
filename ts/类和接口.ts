export {}

// 定义一个接口
interface Eat {
	eat(food: string): void
}
interface Run {
	run(distance: number): void
}

// 用implements去实现接口 在person中就必须有对应的成员
// 尽量一个接口只约束一个能力
class Person implements Eat, Run {
	eat(food: string): void {
		console.log(`人类吃${food}`)
	}
	run(distance: number) {
		console.log('人类走' + distance)
	}
}

class Animal implements Eat, Run {
	eat(food: string): void {
		console.log(`动物吃${food}`)
	}
	run(distance: number) {
		console.log('动物走' + distance)
	}
}
