const oldArrayPrototype = Array.prototype
const newArrayPrototype = Object.create(oldArrayPrototype)

const arrayMethod = ['push', 'pop', 'shift', 'unshift', 'filter', 'splice']

arrayMethod.forEach((method) => {
  newArrayPrototype[method] = function () {
    console.log("refresh")
    oldArrayPrototype[method].call(this, ...arguments)
  }
})