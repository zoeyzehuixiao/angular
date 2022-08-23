//1
function tryMyChance(){
    let count = 0;
    return function(){
        count += 1
        if(count <= 5){
            console.log("Congrats you earn the chance!")
        }else{
            console.log("Sorry you missed the chance")
        }
    }
}
const closure = tryMyChance();

//test #1
for(let i = 0; i < 8; i++){
    closure();
}


//2
function longerThan(minimumLength){
    return (element) => {
        return (element.length > minimumLength)
    }
}

//test #2
let minimumLength = 3;
console.log(['this', 'is', 'a', 'string', 'array'].filter(longerThan(minimumLength)));