function getFactors(num){
    const result = []
    for(let i = 0; i <= num; i++){
        if(num % i === 0){
            result.push(i)
        }
    }
    return result;
}
console.log(getFactors(6))
console.log(getFactors(7))
console.log(getFactors(1))
console.log(getFactors(2))