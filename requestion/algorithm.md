

> 1.实现一个函数trim(str) 字符串前后去空格


```javascript
function trim(str) {
    return str.replace(/^(\s*)(.*?)(\s*)$/,'$2');
}
```

> 2.驼峰转下划线，下划线转驼峰


* 驼峰转下划线

```javascript
function transform(str){
    return str.replace(/[A-Z]/g,(str)=>{
        return str.toLowerCase();
    })
}
```

* 下划线转驼峰

```javascript
function transform(str){
    return str.replace(/-([a-z])/g,(str,m1)=>{
        return m1.toUperCase();
    });
}
```

> 3.去重，空间换时间

```javascript
function uniqueArr(arr){
    var map = {};
    var nArr = [];
    for(var item of arr){
        if(!map[`${item}`]) {
            map[`${item}`] = true;
            nArr.push(item)
        }
    }
    return nArr;
}
```

> 4.翻转数组，不能使用reverse方法

```javascript
function reverseArr(arr){
    var start = 0;
    var end = arr.length-1;
    while(start<end) {
        var temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    return arr;
}
```