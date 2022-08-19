function combination(s){
    const result = []
    for(let i = 0; i < s.length; i++){
        for(let j = i + 1; j < s.length + 1; j++){
            result.push(s.slice(i, j))
        }
    }
    return result; 
}
console.log(combination("dog"))