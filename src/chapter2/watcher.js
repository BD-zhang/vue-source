/**
 * 编写Watcher类
 */

export default class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    // 执行this.getter()，就可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }

  get() {
    // 这里将window.target赋值为this，实际上就是把Watcher添加到了依赖中
    // 因为Dep中添加的依赖实际上就是window.target
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value 
  }

  update () {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

/**
 * 解析简单路径 jm
 */ 
const bailRE = /[^\w.$]/ 
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}