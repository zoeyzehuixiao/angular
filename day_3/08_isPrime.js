function isPrime(num){
    if ( num === 1 ) return false;
    for(let i = 2; i < num - 1; i++){
        if(num % i === 0 && num != 0){
            return false;
        }
    }
    return true;
}//TODO: optimize
console.log(isPrime(1))
console.log(isPrime(2))
console.log(isPrime(3))
console.log(isPrime(7))
console.log(isPrime(13))
console.log(isPrime(14))
