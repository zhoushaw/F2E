
[mongodb面试题](https://juejin.im/post/5d74fd60e51d4561c67840f4#heading-4)

> 1.mongodb与mysql有什么不同

* mongodb是基于分布式文件存储的开源数据库系统，由c++编写，给web应用提供高性能数据库存储方案
* 关系型与非关系型：
    * mongodb是关系型数据库，mysql非关系型数据库
* 优势：
    * 面向集合和文档存储，以json格式的文档存储数据
    * 高性能，支持document中嵌入document减少数据库上的I/o操作，具有完整的索引支持
    * 高效的存储方式：支持二进制以及大型对象
    * 高可用性，mongodb支持数据库之间的数据复制已转移故障
    * 丰富的查询功能
* 查询语句：
    * mongodb形式查询，将热数据放在内存中，从而达到高速读写
    * mysql，sql查询
* 数据存储与读取：
    * json读取比较方便


> 2.哪些场景会用到mongodb

* 大量事务性的不会用到mongodb
* 数据管理
