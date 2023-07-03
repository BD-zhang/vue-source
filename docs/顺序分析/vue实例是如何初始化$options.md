# vue实例是如何初始化$options的
在初步了解vue在`_init`实例中可以看到，根据当前实例是否为组件进行不同逻辑处理
```js
// merge options
if (options && options._isComponent) {
  // optimize internal component instantiation
  // since dynamic options merging is pretty slow, and none of the
  // internal component options needs special treatment.
  initInternalComponent(vm, options)
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```
## 非组件
### mergeOptions
`mergeOptions`中先是标准化处理props inject directives，以便后续管理维护
```js
normalizeProps(child, vm)
normalizeInject(child, vm)
normalizeDirectives(child)
```
#### normalizeProps
在vue中使用props，值可以为字符串数组以及对象，当`props`为数组类型时，其本质就是给每一个元素生成一个`{key: val, type: null}`的子对象，当`props`为对象类型时，会根据子对象生成一个新的键值对，根据子对象的值是否为对象类型来进行设值


### resolveConstructorOptions

## 组件