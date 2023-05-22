class Publisher {
  constructor() {
    this.subscribers = {}
  }

  addSubs (type, callback) {
    this.subscribers[type] = callback
  }

  publish (type, message) {
    let fn = this.subscribers[type]
    fn(`${type}${message}`)
  }
}

let ps = new Publisher()
ps.addSubs('a', function (msg) {
  console.log('a订阅了', msg)
})
ps.addSubs('b', function (msg) {
  console.log('b订阅了', msg)
})
ps.publish('a', '发送了')
ps.publish('b', '发送了')