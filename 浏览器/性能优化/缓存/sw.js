setTimeout(() => {
    console.log('timeout1');
    process.nextTick(()=>{
        console.log('nextTick');
        
    })
})
setTimeout(() => {
    console.log('timeout2');

})