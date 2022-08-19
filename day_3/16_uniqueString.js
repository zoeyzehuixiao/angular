function uniqueString(s){
    let unique = ""
    for(c of s){
        if(!unique.includes(c)){
            unique += c;
        }
    }
    return unique;
}
console.log(uniqueString("thequickbrownfoxjumpsoverthelazydog"))
