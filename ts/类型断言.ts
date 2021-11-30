export {}

const nums = [100, 120, 119, 112]
const res = nums.find((i) => i > 0) //此时为number | undefined 因为我们知道一定有大于0的数字而ts认为有可能找不到 所以推断出来的是number或者underfined
// 断言就是我确信这个res为数字类型 明确告诉ts这是一个数字类型
// 1.使用as断言
const nums1 = res as number
const res1 = nums.find((i) => i > 0) as number

// 2.使用<>方式断言
const nums2 = <number>res //jsx下不能使用 推荐第一种as的方式
