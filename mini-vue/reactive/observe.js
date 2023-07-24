import { Dep } from './dep.js'
import { Watcher } from './watcher.js'

export class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  
  walk(value) {
    const keys = Object.keys(value)
    for (let i = 0;i < keys.length;i++) {
      defineReactive(value, keys[i])
    }
  }
}

export function defineReactive(obj, key, val) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, val)
  if (property && !property.configurable) return

  const getter = property && property.get
  const setter = property && property.set

  val = obj[key]

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('--getter', val)
      if (Dep.target) {
        dep.addSubs(Dep.target)
      }
      return val
    },
    set(newVal) {
      console.log('--setter', newVal)
      val = newVal
      dep.notify()
    }
  })
}