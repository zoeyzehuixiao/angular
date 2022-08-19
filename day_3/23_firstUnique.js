function firstUnique(s){

    for(c of s){
        if (!s.replace(c, '').includes(c)){
            return c;
        }
    }
    return null;
}
console.log(firstUnique("abacddbec"))