<!-- 
let add = (()=>{
    let val = 0;
    function fn(n){
        val = val+n;
        return fn;
    }
    fn.val = function(){
        return val;
    }
    return fn;
})();



function isStringValid(str){
    var map = {
        '[': ']',
        '{': '}',
        '(': ')';
    }
    var stack = [];
    var index = 0;
    var nStr str.replace(/[^\{\}\[\]\(\)]/g,'')
    while(index<nStr.length) {
        let nS = nStr[index];
        if(map[nS]) {
            stack.push(nS);
        } else {
            let popStr = stack.pop();
            if(map[popStr]!==nS) return false;
        }
    }
    if(stack.length===0) {
        return true;
    } else {
        return false;
    }
}

body,html{
    height: 100%;
}
.content{
    position: fixed;
    width: calc(100% - 40px);
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
<div class="content"></div>

resize

htmlFontSize = screenWidth/750*100;

1.loader，拿到css
2.把css内容转成ast，把px单位内容
3.转换成100px=>1rem，以750为基准
4.页面htmlFontSize = screenWidth/750*100 + 'px'; -->


<!-- 
实现一个DIV： 1. 其距离屏幕两边都是20px 2. 高度是屏幕宽度的50% 3. div内有文本“快手”，要求快手垂直水平居中

vw单位

rem单位：

构建层实现把px转成rem的工具


实现一个函数isStringValid，判断字符串是否是有效字符串，如果正确，就返回true，如果错误，返回false

{ } [] ()

a{aac} true 

a{}} false

k(u{a})(I()[s]){h}ou   =>  true
kua(i[[]}s)ho(u)   =>  false
k(u{a})(I()[s]){h}ou  => true

实现一个函数add

add(1).val => 1
add(1)(2).val => 3
add(1)(2)(3).val => 6
 -->