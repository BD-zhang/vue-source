/**
 * 处理依赖收集的类，将该部分的功能抽离出来
 * */ 

class Dep {
  static target = null

  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    console.log('window.ge', Dep.target)
    if (Dep.target) {
      console.log('添加依赖')
      this.addSub(Dep.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    console.log('subs', subs)
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }  
}

function remove(arr, item) {
  const index = arr.indexOf(item)
  if (index > -1) return arr.splice(index, 1)
}

/**
 * 编写Watcher类
 */

class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    // 执行this.getter()，就可以读取data.a.b.c的内容
    console.log('开始执行this.getter')
    this.getter = parsePath(expOrFn)
    console.log('结束执行this.getter')
    this.cb = cb
    this.value = this.get()
  }

  get() {
    console.log('watcher getter')
    // 这里将window.target赋值为this，实际上就是把Watcher添加到了依赖中
    // 因为Dep中添加的依赖实际上就是window.target
    Dep.target = this
    let value = this.getter.call(this.vm, this.vm)
    console.log('vlaue', value)
    Dep.target = undefined
    return value 
  }

  set() {
    console.log('shit')
  }
 
  update () {
    console.log('watcher update')
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

/**
 * 解析简单路径 
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

function defineReactive3 (data, key, val) {
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('getter')
      dep.depend()
      return val
    },
    set(newVal) {
      console.log('setter')
      if (val === newVal) return
      dep.notify()
      val = newVal
    }
  })
}


const data = {}

function define() {
  return new Promise((resolve) => {
    defineReactive3(data, 'a', 'string2')
    resolve()
  })
}

define()
  .then(() => {
    new Watcher(data, 'data.a', () => {
      console.log('here is new Watcher')
    })
  })

console.log('data-a', data.a)
data.a = 'string11'