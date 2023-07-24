export class Dep {
  static target
  constructor() {
    this.subs = []
  }

  addSubs(sub) {
    this.subs.push(sub)
  }

  removeSubs(sub) {
    const index = this.subs.indexOf(sub)
    index > 0 && this.subs.splice(index, 1)
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0;i < subs.length;i++) {
      subs[i].update()
    }
  }
}