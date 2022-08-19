function fixedLengthSubsets(n, arr){
    const subsets = []
    for(let i = 0; i < arr.length; i++){
        subsets.push([arr[i]]);
        let length = subsets.length;
        for(j = 0; j < length - 1; j++){
            subsets.push([arr[i], ...subsets[j]])
        }
    }
    return subsets.filter(subset =>
        subset.length === n)
}
console.log(fixedLengthSubsets(3, [1, 2, 3]))
console.log(fixedLengthSubsets(3, [1, 2, 3, 4, 5, 6]))