class CanvasToImg {
	constructor(name, options) {
		this.canvas = document.getElementById(name)
		this.ctx = this.canvas ? this.canvas.getContext('2d') : null
		this.history = [] //记录笔迹
		this.operation = [] //图层及所有操作
		this.cache = [] //缓存区 记录撤回的步骤以便恢复时使用
		this.options = arguments[1] ? options : { width: 300, height: 150 } //记录配置项
		this.Item = {
			x: 0,
			y: 0,
			strong: 0.5,
			color: '#000',
			isLock: false,
			status: 'round',
		} //笔刷的状态 定位粗细等
		this.init()
	}
	// 初始化
	init() {
		let { width, height } = this.options
		// Function
		const isNum = (num) => typeof num === 'number' && isFinite(num) //数字判断
		const warn = console.warn
		// Estimate
		if (!isNum(width))
			return warn('CanvasToImg配置项里面的width不是数字类型')
		if (!isNum(height))
			return warn('CanvasToImg配置项里面的height不是数字类型')
		// Methods
		this.setSize({ width, height }) //设置画布大小
		this.setOnMonitor() //设置监听器
	}
	// 设置监听器
	setOnMonitor() {
		//获取设备信息 移动端采用touch事件 pc端采用mouse事件
		//判断访问终端
		let browser = {
			versions: (function () {
				var u = navigator.userAgent,
					app = navigator.appVersion
				return {
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android:
						u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
					weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
					qq: u.match(/\sQQ/i) == ' qq', //是否QQ
				}
			})(),
			language: (
				navigator.browserLanguage || navigator.language
			).toLowerCase(),
		}
		let isMobile = browser.versions.mobile
		// 按下时的事件名
		let Down = isMobile ? 'touchstart' : 'mousedown' //按下
		let Up = isMobile ? 'touchend' : 'mouseup' //抬起
		let Move = isMobile ? 'touchmove' : 'mousemove'

		// 1.监听canvas内部的鼠标按下事件
		// 鼠标/手指按下时
		this.onCanvas(Down, (e) => {
			e.preventDefault()
			if (e.button !== 0 && !isMobile) return
			this.Item.isLock = true
			let data = this.getMoveStates(browser, e)
			this.Item.x = data.X
			this.Item.y = data.Y
		})
		// 抬起
		this.onCanvas(Up, (e) => {
			e.preventDefault()
			this.Item.isLock = false
			this.closePath()
		})
		// 移动
		this.onCanvas(Move, (e) => {
			e.preventDefault()
			if (!this.Item.isLock) return
			let data = this.getMoveStates(browser, e)
			this.drawLine(data)
			this.Item.x = data.X
			this.Item.y = data.Y
		})
		// pc端超出范围判断
		if (!isMobile) {
			this.onCanvas('mouseout', (e) => (this.Item.isLock = false))
			this.onCanvas('contextmenu', (e) => e.preventDefault())
			this.on('keydown', (e) => {
				if (e.ctrlKey && e.keyCode == 90) this.recall()
				if (e.ctrlKey && e.keyCode == 89) this.nextStep()
			})
		}
	}
	// 设置canvas大小
	setSize({ width, height }) {
		width && (this.canvas.width = width)
		height && (this.canvas.height = height)
	}
	// 封一下监听器
	on(name, callback, type = 'window') {
		let Dom = type == 'window' ? window : this[type]
		return Dom.addEventListener(name, callback)
	}
	onCanvas(name, callback) {
		return this.canvas.addEventListener(name, callback)
	}
	// 重绘
	reDraw(cb) {
		requestAnimationFrame(() => {
			if (cb) cb()
			this.setSize({
				width: this.options.width,
				height: this.options.height,
			})
			this.operation.forEach((v) => {
				this.drawAgain(v)
			})
		})
	}
	// 复制
	deepClone(target) {
		let result
		if (typeof target === 'object') {
			if (Array.isArray(target)) {
				result = []
				for (let i in target) {
					result.push(this.deepClone(target[i]))
				}
			} else if (target === null) {
				result = null
			} else if (target.constructor === RegExp) {
				result = target
			} else {
				result = {}
				for (let i in target) {
					result[i] = this.deepClone(target[i])
				}
			}
		} else {
			result = target
		}
		return result
	}
	// 一笔结束记入栈内 清除记录笔迹
	closePath() {
		let { history, operation } = this
		operation.push([...this.deepClone(history)])
		this.history = []
		this.cache = []
	}
	// 撤回上一步
	recall() {
		if (this.operation.length <= 0) return
		console.log('这里是撤回')
		let { cache, operation } = this
		let item = this.deepClone(operation[operation.length - 1])
		operation.pop()
		cache.unshift(item)
		this.history = []
		this.reDraw()
	}
	// 下一步
	nextStep() {
		if (this.cache.length <= 0) return
		let { cache, operation } = this
		let item = this.deepClone(cache[0])
		cache.shift()
		operation.push(item)
		this.history = []
		this.reDraw()
	}

	// 拿到点击事件对应的数据
	getMoveStates(browser, target) {
		let { offsetTop, offsetLeft } = this.canvas
		if (browser.versions.mobile) {
			//移动端
			let e = target.targetTouches[0]
			return { X: e.clientX - offsetLeft, Y: e.clientY - offsetTop }
		} else {
			//pc端
			return { X: target.offsetX, Y: target.offsetY }
		}
	}
	// 修改笔刷状态
	setPoint() {}
	// 根据坐标绘制直线
	drawLine({ X, Y }) {
		let { Item, ctx, history } = this
		// 第三种 移动侦测
		ctx.lineWidth = Item.strong
		ctx.beginPath()
		ctx.lineCap = Item.status
		ctx.moveTo(Item.x, Item.y)
		ctx.lineTo(X, Y)
		ctx.strokeStyle = Item.color
		ctx.stroke()
		history.push({
			from: [Item.x, Item.y],
			to: [X, Y],
			type: 'line',
			options: { ...Item },
		})
	}
	// 复刻 重绘时将存储的线条轨迹全部画出 每一步的
	drawAgain(Item) {
		let { ctx } = this
		Item.forEach((item) => {
			switch (item.type) {
				case 'line':
					ctx.lineWidth = item.options.strong
					ctx.beginPath()
					ctx.lineCap = item.options.status
					ctx.moveTo(item['from'][0], item['from'][1])
					ctx.lineTo(item['to'][0], item['to'][1])
					ctx.strokeStyle = item.options.color
					ctx.stroke()
					break
			}
		})
	}
}
