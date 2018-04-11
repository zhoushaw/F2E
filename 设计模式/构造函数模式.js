function People(name){
    this.name = name;
}

people.prototype.say = function(){
    alert(this.name);
}

var xiaoming = new People();


xiaoming.say();