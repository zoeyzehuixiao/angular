function largerElements(n, numArr){
    return numArr.filter( num =>
        num > n
    )
}
console.log(largerElements(7, [1, 4, 7, 3, 9, 13, 5, 52]))