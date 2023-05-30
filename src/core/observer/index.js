// @flow
export class Observer {
  // value: any
  // dep: Dep
  // vmCount: number

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    // this.vmCount = 0

    // def方法封装在 src/core/util/lang.js 中，给特定对象添加一个数据属性
    def(value, '__ob__', this)
    // 这里为判断是否为数组对象
    if (Array.isArray(value)) {
      // 这里判断数组对象是否存在proto对象，该值暴露于 src/core/util 中
      // hasProto = '__proto__' in {} 判断浏览器是否支持__proto__
      if (hasProto) {
        // 这里将目前数组对象的__proto__指向arrayMethods，修改数组对象的原型链
        // arrayMethods里的方法都经过改造...
        protoAugment(value, arrayMethods)
      } else {
        // 如果数组对象没有对应的__proto__则将其的数组方法通过对应的响应式方法重新绑定起来
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src: Object) {
  target.__proto__ = src
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}


/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
