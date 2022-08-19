function isPerfect(num){
    const divisors = []
    for(let i = 1; i < num; i++){
        if(num % i === 0){
            divisors.push(i)
        }
    }
    let sum = 0
    for(d of divisors){
        sum += d
    }
    return sum === num
}
console.log(isPerfect(6))
console.log(isPerfect(28))
console.log(isPerfect(33550336))
console.log(isPerfect(1))