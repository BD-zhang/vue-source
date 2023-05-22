class Observer {
  constructor (label) {
    this.label = label
  }

  updated () {
    console.log(`update${this.label}`)
  }
}

class Target {
  constructor () {
    this.observerList = []
  }

  add (observer) {
    this.observerList.push(observer)
  }

  remove () {
    this.observerList = this.observerList.filter(ob => ob !== observer)
  }

  notify () {
    this.observerList.forEach(ob => {
      ob.updated()
    })
  }
}