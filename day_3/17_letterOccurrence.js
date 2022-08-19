function occurrenceCount(s){
    const result = {}
    for(c of s){
        if(c in result){
            result[c] += 1
        }else{
            result[c]= 1;
        }
    }
    return result;
}
console.log(occurrenceCount("thequickbrownfoxjumpsoverthelazydog"))