function longestSubstr(s){
    let result = '';
    for(let i = 0; i < s.length; i++){
        const set = new Set();
        let temp = '';
        for(let j = i; j < s.length; j++){
            if(!set.has(s.charAt(j))){
                set.add(s.charAt(j));
                temp += s.charAt(j);
            }else{
                break;
            }
        }
        result = temp.length > result.length? temp : result;
    }
    return result;
}
console.log(longestSubstr("abcdbdbhuhfubdo"))