function identityMatrix(n){
    const result = []
    for(let i = 0; i < n; i++){
        const temp = []
        for(let j = 0; j < n; j++){
            temp.push(i === j? 1 : 0)
        }
        result.push(temp);
    }
    return result;
}
console.log(identityMatrix(3))
console.log(identityMatrix(4))
console.log(identityMatrix(5))
console.log(identityMatrix(6))