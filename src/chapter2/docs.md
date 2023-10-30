# vue2中是如何侦测数据变化的

> vue2中是利用`Object.defineProperty`来将被侦测对象属性转换成`getter`/`setter`的形式，一旦读取了数据，即是触发了`getter`，一旦修改了数据既是触发了`setter`，从而达到侦测数据属性变化的目的

在使用Vue的过程中，我们知道一旦修改了`data`内的内容，一些同时使用了改变量的地方也会同时更新数据。而vue采用的办法是先收集对应的依赖，然后数据变化了，就通知对应的依赖更新数据

## 依赖

在vue中，是在`getter`中收集有哪些依赖使用了数据，而当`setter`被触发时，又去通知`getter`中收集的依赖

实际上，主要的工作都是在`Object.defineProperty`中的`getter`以及`setter`中完成

### Dep

在vue源码中，依赖的管理是放在Dep这个类中， 实际上就是给当前的实例维护一个数组，而数组内保存的即是watcher

### Watcher

`watcher`是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方，
