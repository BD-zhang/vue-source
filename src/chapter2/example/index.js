import Observer from "../core.js"
import Watcher from "../watcher.js"

const data = {
  string: '字符串',
  number: 100
}

new Observer(data)
new Watcher(data, 'string', () => {
  console.log('watcher监听到了')
})

data.string = '更改了'

// 这是操作代码
let strCount = 1
const button = document.createElement('button')
button.innerHTML = '点击更改string数据'
document.body.appendChild(button)
button.addEventListener('click', () => {
  data.string = data.string + strCount
  strCount++
  console.log('data.string', data.string)
})

const div = document.createElement('div')
div.innerHTML = data.string
document.body.appendChild(div)