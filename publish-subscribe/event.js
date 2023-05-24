let eventObj = (function () {
  let clientList = {}
  trigger = function () {
    let key = Array.prototype.shift.call(arguments)
    fnList = clientList[key]

    if (!fnList || fnList.length === 0) {
        return false
    }
    
    for (let i = 0 ;i < fnList.length;i++) {
        fnList[i].apply(this, arguments)
    }
  }
  listen = function (key, fn) {
      if (!clientList[key]) {
          clientList[key] = []
      }
      clientList[key].push(fn)
  }
  remove = function (key, fn) {
    let fnList = clientList[key]
    if (!fnList) {
        return false
    }
    if (!fn) {
        fnList && (fnList.length = 0)
    }
    else {
        for (let i = 0;i < fnList.length;i++) {
            let _fn = fnList[i]
            if (_fn === fn) {
                fnList.splice(i, 1)
            }
        }
    }
  }
  return {
    listen,
    trigger,
    remove
  }
})()

// eventObj.listen('aaa', function (msg) {
//   console.log('msg=', msg)
// })
// eventObj.listen('bbb', function (msg) {
//   console.log('msg=', msg)
// })
// eventObj.listen('vvv', function (msg) {
//   console.log('msg=', msg)
// })
// eventObj.trigger('aaa', 'trigger')

// console.log('!!!', eventObj)