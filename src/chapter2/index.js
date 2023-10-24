// 变化侦测

/**
 * 首先了解Object.defineProperty，具有getter, setter属性
 * 可以监听取值与设置
*/

/**
 * 知道了defineProperty之后，可以写出以下代码
*/

export function defineReactive1 (data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      if (val === newVal) return
      val = newVal
    }
  })
}

/**
 * 依赖收集在哪里
 * 用一个数组保存依赖，并且假设依赖是一个函数
*/

export function defineReactive2 (data, key, val) {
  // add new code
  const dep = []
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // add new code
      dep.push(window.target)
      return val
    },
    set(newVal) {
      if (val === newVal) return
      // add new code
      for (let i = 0; i < dep.length; i++) {
        dep[i](newVal, val)
      }
      val = newVal
    }
  })
}

/**
 * 处理依赖收集的类，将该部分的功能抽离出来
 * */ 

export class Dep {
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
    if (window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    subs.forEach((index, sub) => {
      sub[index].update()
    })
  }  
}

function remove(arr, item) {
  const index = arr.indexOf(item)
  if (index > -1) return arr.splice(index, 1)
}

export function defineReactive3 (data, key, val) {
  // add new code
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // add new code
      dep.depend()
      return val
    },
    set(newVal) {
      if (val === newVal) return
      // add new code
      dep.notify()
      val = newVal
    }
  })
}