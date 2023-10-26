/** 
  * Observer类会附加到每一个被侦测的object上。 
  * 一旦被附加上，Observer会将object的所有属性转换为getter/setter的形式 
  * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖 
  */ 

import Dep from './dep.js'

export default class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

function defineReactive (data, key, val) {
  if (typeof val === 'object') new Observer(val)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('getter', val)
      dep.depend()
      return val
    },
    set(newVal) {
      if (val === newVal) return
      val = newVal
      console.log('setter', newVal)
      dep.notify()
    }
  })
}
