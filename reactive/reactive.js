class Observer {
    constructor (data) {
        this.data = data
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                Object.setPrototypeOf(data[key], newArrayPrototype)
            }
            if (typeof data[key] === 'object') {
                new Observer(data[key])
            } else {
                this.defineReactive(this.data, key, this.data[key])
            }
        })
    }

    defineReactive (data, key ,val) {
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get () {
                console.log('getter', val)
                return val
            },
            set (newValue) {
                console.log('setter', newValue)
                val = newValue
            }
        })
    }
}