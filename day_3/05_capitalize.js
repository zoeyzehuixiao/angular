function capitalize(s){
    return s.split(' ')
            .map((substr)=> 
                substr.charAt(0).toUpperCase() + substr.slice(1, substr.length + 1)
            )
            .join(' ')
}
console.log(capitalize("the quick brown fox"))
