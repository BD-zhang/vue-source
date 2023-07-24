import { Dep } from "./dep.js"

export class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.cb = cb
    this.vm = vm
    Dep.target = this
    // this.cb.call(this.vm)
  }

  update() {
    this.cb.call(this.vm)
  }
}