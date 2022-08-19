function longestWord(s){
    return s.split(' ')
            .reduce((prev, curr) => 
                prev.length >= curr.length ? prev : curr
                //return first word when more than one word have longest length
            )
}
console.log(longestWord("Web Development Tutorial"))