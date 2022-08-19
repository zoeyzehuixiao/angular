function isPalindrome(s){
    return s.split('').reverse().join('') === s
}
console.log(isPalindrome("dog"));
console.log(isPalindrome("madam"));