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

### resolveConstructorOptions

## 组件