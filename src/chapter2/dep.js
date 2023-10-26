/**
 * 处理依赖收集的类，将该部分的功能抽离出来
 * */ 

export default class Dep {
  static target = null

  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }  
}

function remove(arr, item) {
  const index = arr.indexOf(item)
  if (index > -1) return arr.splice(index, 1)
}