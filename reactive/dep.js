class Dep {
  static target
  constructor () {
    // this.id = id
    this.target = null
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    subs.forEach((item) => {
      item.updated()
    })
  }
}