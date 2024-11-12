var startTime = performance.now()

for(let i=0; i < 1000000;i++){
    if(1==1){}
}
    
var endTime = performance.now()

console.log(`Call to doSomething took ${(endTime - startTime)} milliseconds`)