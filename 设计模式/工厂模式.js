function FootBall(){
    this.name = 'football';
}
function BasketBall(){
    this.name = 'ball';
}

function Factory(type){
    if(type=='football'){
        return new FootBall();
    }else if(type=='basketball'){
        return new BasketBall();
    }
}


console.log(Factory('football'));
console.log(Factory('basketball'));