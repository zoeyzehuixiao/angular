function countOccurrence(s, letter){
    let count = 0
    for(c of s){
        if(c === letter){
            count += 1;
        }
    }
    return count;
}
console.log(countOccurrence("microsoft.com", 'o'))