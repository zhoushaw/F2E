
**待完善**

[Typescript入门教程](https://ts.xcatliu.com/basics/type-of-object-interfaces)
[Typescript高阶技巧](https://segmentfault.com/a/1190000019449565?utm_source=tag-newest)
[高阶入门](https://juejin.im/post/5ea40427518825736f6434ef)
[typescript面试题](https://segmentfault.com/a/1190000010969537)

> typescript出现的原因

* 是javascript的超集，为解决javascript大型应用
* typescript通过类型接口等概念来描述数据结构，后续易于维护
* 而且使用的接口提示，对开发者更加友好

> 1.什么是泛型

* 泛型是指在定义时不指定明确数据类型，在使用是指定数据类型
* 只允许函数传入那些属性变量
* 泛型支持默认参数

> 2.重载

* 重载是运行函数接收不同的参数，做不同的处理


> 3.断言

* 通过as，将变量断言成某种类型
* 函数接受两种类型是，如果另一种类型不存在使用的属性就会报错，这是就可以通过断言来断定变量类型


> 4.高级类型

* Partial、Record、Pick、Readonly、Require

> 5.条件判断

```ts
type isTrue<U> = U extends true?true:false;
```

> 6.never、exclude、omit

```ts
type Exclude<A,B> = A extends B?never:A;

type Omit<T,K extends keyof T> = Partial<T,Exclude<keyof T,K>>
```

> 7.typeof

> 8.type和interface的区别

* 都允许描述对象和、函数
* 都支持拓展
* type可以声明基本类型、元祖、联合类型，type可以获取typeof 的类型
* interface可以合并，属性可设置，可选、只读

> 9.枚举


