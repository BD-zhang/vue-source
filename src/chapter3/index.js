const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
  .forEach(method => {
    const originalMethods = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
      value: function mutator (...args) {
        return originalMethods.apply(this, args)
      },
      enumerable: false, 
      writable: true, 
      configurable: true
    })
  })