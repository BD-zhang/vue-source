# 响应式原理
试想如果在一个非vue框架下，想响应式处理页面数据的话，应该如何操作
1. 监听某个用户操作事件
2. 修改数据
3. 手动更新DOM重新渲染

目前这个过程与Vue的最大区别就是多了一步手动更新DOM的操作
而这一步还需要处理一些问题，例如：
1. 需要修改哪块的DOM？
2. 修改效率和性能是不是最优的？
3. 需要对数据每一次的修改都去操作 DOM 吗？
4. 需要 case by case 去写修改 DOM 的逻辑吗？

## 响应式对象

### Object.defineProperty
`Object.defineProperty`会在对象上定义一个新属性，或修改一个对象的现有属性，并返回这个对象
```js
/**
 * obj为要定义对象 prop为要定义或修改的属性的名称 descriptor是将被定义或修改的属性描述符，具体可以查看文档 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
*/
Object.defineProperty(obj, prop, descriptor)
```

### _initState
在进行一个`new Vue`操作的时候，会调用`_init`方法，而`_init`方法又会有`initState`调用方法
```js
  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
```

而在`initState`方法内还有对应的初始化了`props` `methods` `data` `computed` `watch`等内容

#### initProps
该方法主要进行了对propsOptions的遍历，并使用`defineReactive`把prop对应的值变成响应式，然后可以通过`vm._props.xxx`访问到，然后是使用`proxy`把`vm._props.xxx`的访问代理到`vm.xxx`

#### initData
该方法主要是实现data对象响应式，并且使用`proxy`把`vm._data.xxx`的访问代理到`vm.xxx`
> 疑问：为什么在_initProp中遍历props是采用for in 的方式，而在initData中采用的是while


**这块不太好懂，需要琢磨，有点绕**
准备看下这个https://github.com/DMQ/mvvm 
### observe方法
### Observer类
### defineReactive方法