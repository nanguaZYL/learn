export {}
// 类可以用来描述一类具体对象的抽象成员

// es6开始有了class ts增强了class的相关语法
// 只读属性 readonly  加了只读属性之后无法再修改值 不管在外部还是内部都无法修改
class Person {
	// public是公有成员 不加默认就是public
	public name: string = '' //可以用=赋值一个初始值也可在构造函数constructor中赋值
	private age: number //private表示该成员是私有属性 不能直接访问 只能在类里面访问
	protected readonly gender: boolean //protected也不能在外部访问 与private区别是protected可以在子类中访问
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
		this.gender = true
	}
	sayHi(msg: string): void {
		console.log(`I m ${this.name} ,${this.age}`)
	}
}

class Student extends Person {
	constructor(name: string, age: number) {
		super(name, age)
		console.log(this.gender) //可以访问
	}
	static create(name: string, age: number) {
		return new Student(name, age)
	}
}

const tom = new Person('tom', 18)
console.log(tom.name) //可以访问
// console.log(tom.age) //私有属性 无法访问

// constructor构造函数加上private修饰符无法构造 const jack = new Student() 无法创建 此时只能在Student类里加个方法构造该类并返回
const jack = Student.create('jack', 18)
