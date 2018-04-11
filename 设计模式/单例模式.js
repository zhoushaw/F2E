function Dialog(){
    this.title = '标题'
}

var modelProxy = (function(){
    var instance = null;
    return function (){
        if(!instance){
            return new Dialog();
        }
    }
})();




var dialog1 = modelProxy();
var dialog2 = modelProxy();


console.log(dialog1,dialog2);