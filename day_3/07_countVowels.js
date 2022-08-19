function countVowels(s){
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    return s.split('')
            .filter( c => vowels.includes(c))
            .length
}
console.log(countVowels("the quick brown box"))
