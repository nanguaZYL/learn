export {}

// 抽象类跟接口有些类似 与接口不同的是接口不包括具体的实现 而抽象类可以包含一些具体的实现
// 一般较大的类目用抽象类
// abstract定义抽象类 用extends继承
abstract class Animal {
	eat(food: string): void {
		console.log('吃')
	}
	abstract run(distance: number): void //抽象方法 用abstract 父类中有抽象方法 子类中必须去实现
}

class Dog extends Animal {
	run(distance: number) {
		console.log(`距离${distance}`)
	}
}

const d = new Dog()
d.run(150)
