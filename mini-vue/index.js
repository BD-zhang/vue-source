import { Observer } from "./reactive/observe.js";
import { Watcher } from "./reactive/watcher.js";
const obj = {
  name: 'tom',
  age: 12,
  obj2: {
    name2: 'jerry',
    age2: 33
  }
}
const dom = document.querySelector('#data')
dom.innerText = obj.name

new Watcher(obj, null, function() {
  const dom = document.querySelector('#data')
  console.log('obj.name--', obj.name)
  dom.innerText = obj.name
}, null)

new Observer(obj)
console.log('obj', obj.name)
obj.name = 'test'
obj.age = 32

let count = 1

setTimeout(() => {
  obj.name = 'test1'
}, 1000)

