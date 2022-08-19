function bn(b, n){
    if(n === 0) return 1
    let result = b
    while(n != 1){
        result *= b
        n --
    }
    return result;
}

console.log(bn(2, 1))
