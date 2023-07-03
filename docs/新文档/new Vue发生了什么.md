# new Vue发生了什么
首先在源码中找到这个构造函数，
```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
可以看到最后执行了一个初始化函数，接下来便分析下_init函数

## this._init
this._init方法挂载在vue原型链上，通过在index.js函数执行initMixin函数挂载
```js
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')

if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```   
该方法主要是进行一些配置的合并以及对实例进行各部分内容的初始化，接下来只从部分重点初始化函数开始分析

### initLifecycle
该方法主要初始化一些`_`一节`$`开头的变量

### initEvent
.......

### initRender
在该方法中主要是暴露`_`以及`$`开头的`createElement`方法，后续就是调用`defineReactive`方法对数据进行响应式处理

### callHook
可以看到目前为止，已经初始化了`lifecycle events render`等逻辑，接下来便是执行了`callHook(vm, 'beforeCreate')`
```js
pushTarget() 

const handlers = vm.$options[hook]
const info = `${hook} hook`
if (handlers) {
  for (let i = 0, j = handlers.length; i < j; i++) {
    invokeWithErrorHandling(handlers[i], vm, null, vm, info)
  }
}
if (vm._hasHookEvent) {
  vm.$emit('hook:' + hook)
}

popTarget()
```
该方法为执行对应生命周期函数，具体分析在**生命周期函数执行**

### initInjections

### initState
```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
截至目前可以看到，vue是把对`props`、`methods`、`data`、`computed`、`watch`等内容的处理放在`beforeCreate`后`created`前的`initState`中，因此在`beforeCreate`生命周期内是无法获取对应的值

#### initProps
显而易见，这里其实就是进行实例中的props初始化，并且进行一些列的props校验，最后响应式处理props，在initProps之后便是调用created生命周期函数

#### $mounted
在进行了一系列数据的初始化之后，执行了
```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```

截止目前便是最基本的new Vue后具体会发生的事情，接下来主要探讨模板解析、挂载、更新、数据的响应式等等方面的内容