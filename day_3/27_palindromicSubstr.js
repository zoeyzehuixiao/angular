function longestPalindromicSubstr(s){
    //banana
    let left = 0;
    let right = 0;
    let substrs = []
    let length = 0;
    for(let i = 0; i < s.length; i++){
        let temp1 = expand(s, i, i)
        let temp2 = expand(s, i, i + 1)
        substrs.push(temp1);
        substrs.push(temp2);
        length = Math.max(temp1.length, 
                    temp2.length, length)
    }
    console.log(substrs)
    return substrs.filter(substr => substr.length === length)
}

function expand(s, left, right){
    while(left >= 0 && right < s.length
            && s.charAt(left) === s.charAt(right)){
                left--
                right++
    }
    return s.slice(left + 1, right)
}
console.log(longestPalindromicSubstr("banana"));
console.log(longestPalindromicSubstr("abracadabra"));