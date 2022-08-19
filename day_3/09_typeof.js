function findType(arg){
    return typeof arg;
}
console.log(findType(2));
console.log(findType(undefined));
console.log(findType(' '));
console.log(findType(()=>{}));
console.log(findType({}));
console.log(findType(true));
