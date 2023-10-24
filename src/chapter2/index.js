// 变化侦测

/**
 * 首先了解Object.defineProperty，具有getter, setter属性
 * 可以监听取值与设置
*/

/**
 * 知道了defineProperty之后，可以写出以下代码
*/

function defineReactive1 (data, key, val) {
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

function defineReactive2 (data, key, val) {
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
