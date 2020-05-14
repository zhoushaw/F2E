

> 1.BFC是什么有什么作用

* bfc特点：
    * bfc内的元素不会影响外面元素
    * bfc内的浮动元素也会参与高度计算
    * 同一个bfc内的元素垂直方向的margin会出现重叠
    * bfc内的元素按照水平方向依次排列
    * bfc元素不会与float元素重叠
* 形成bfc：
    * 根元素
    * position为fixed、absolute
    * float部位none
    * overflow部位visible
    * display为inline-block、flex、inlin-flex、table-cell


> 2.盒模型

* 特点：
    * 标准盒模型构成：content+padding+border+margin,盒模型宽度：content部分
    * ie盒模型：content+padding+border+margin,盒模型宽度：content+padding+border
* box-siziing:
    * content-box,设置为标准盒模型
    * border-box，设置为ie盒模型的宽高计算方式

> 3.link和@import的不同

* link可以用于加载除css外还可以用于定义rss、定义ref等属性，不存在兼容性问题，
* import只能用于加载css
* 当页面被加载时，link引用的css会同时被加载，而import则会等到页面被全部下载完才会加载，会出现闪烁


> 3.居中布局

* position: absolute;top:50%;left: 50%;margin回移一半
* display:flex;justifiy-content: center;align-items: center;
* position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%);


> 4.选择器优先级

* important,10000
* 行内样式,1000
* id，#选择器,100
* class，10
* 标签选择器、伪类选择器
* 通配符选择器


> 5.清浮动

* 伪类清浮动，#box::after{ content:'';display: inline-block;clear:both; }
* 变更为bfc元素
* 在末尾添加清浮动元素，并增加clear：both属性

> 6.层叠上下文

* 概述：在web页面渲染时，某些元素会受z-index值得影响，这些受z-index影响的元素称职之为层叠上下文
* 形成层叠上下文的条件：根元素是层叠上下文、position：absolute/fixed、grid、flex
* 特点：
    * 当容器的z-index为有效数值并生效时，容器内的子元素无法穿过容器否则反之
    * 当父容器的z-index为有效数值并生效时，子元素的层级由父元素决定，这种变化后的容器元素我们称之为层叠上下文
    * 层叠上下文元素可嵌套，层叠上下文子元素均受层叠上下文外层元素影响
    * 每个层叠上下文和兄弟元素独立，当进行层叠变化或渲染时，可以需要考虑子元素
    * 层叠上下文未指定z-index时，其层叠上下文等级与z-index: 0相同，要普通元素高，指定z-index时按照层叠等级应该是z-index: 0

* 当处于同一个层叠上下文时按照以下顺序判断：
    * z-index为负、block块状水平盒子、float浮动元素、inline-block水平盒子、z-index: auto、z-index: 0、z-index：为正


> 7.rem适配方案

* 通过动态获取屏幕宽度，以375宽度、字体大小50为基准
* 通过监听resize的变化等比缩放
* 设计图750为标准，则按照
* 1rem=根字体px
* 以750为基准，7.5rem为屏幕宽度，根字体大小=(width/750)*100+'px';


> 8.flex模型

* flex中项目的flex属性有什么作用
    * 分别可以定义为：flex-grow、flex-shrink、flex-base
        * flex-grow：容器存在剩余空间，若单个项目或多个项目为1等分剩余空间、其他项目为1，一个为2，另一个等分空间是其他的两倍。默认为auto不占据剩余空间
        * flex-shrink：默认为1，空间不足缩小。其他项目都为1，单个为0，则表示单个不缩放
        * flex-base：默认为auto表示项目原大小。可以设置为像素值，这个值将在flex-grow前生效,表明项目占据的空间
* order作用域项目上
    * 值越大排在越后面
        
        