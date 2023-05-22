const event = {
    clientList: {},
    trigger: function () {
        let key = Array.prototype.shift.call(arguments)
        fnList = this.clientList[key]

        if (!fnList || fnList.length === 0) {
            return false
        }
        
        for (let i = 0 ;i < fnList.length;i++) {
            fnList[i].apply(this, arguments)
        }
    },
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    }
}

const installEvent = (obj) => {
    for (let i in event) {
        obj[i] = event[i]
    }
    console.log('obj', obj)
}

// 对象1
const obj1 = {}
installEvent(obj1)
obj1.listen('person1', (msg) => {
    console.log('person1', msg)
})
obj1.listen('person2', (msg) => {
    console.log('person2', msg)
})
obj1.trigger('person1', '触发person1')
obj1.trigger('person2', '触发person2')
// 对象2
const obj2 = {}
installEvent(obj2)
obj2.listen('person3', (msg) => {
    console.log('person3', msg)
})
obj2.listen('person4', (msg) => {
    console.log('person4', msg)
})
obj2.trigger('person3', '触发person3')
obj2.trigger('person4', '触发person4')
console.log('eee', event)