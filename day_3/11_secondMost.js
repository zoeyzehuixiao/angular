/* O(nlogn)??
function secondMost(numArr){
    if(numArr.length < 4) return []
    numArr.sort()
    return [numArr[1], numArr[numArr.length - 2]]
}
*/

//O(2n) solution:
function secondMost(numArr){
    if(numArr.length < 2) return [] 

    const result = []
    if(numArr[0] > numArr[1]){
        let temp = numArr[0]
        numArr[0] = numArr[1]
        numArr[1] = temp
    }
    for(let i = 2; i < numArr.length; i++) {
        if(numArr[1] > numArr[i]){
            let temp = numArr[i]
            numArr[i] = numArr[1]
            numArr[1] = temp
        }
    }
    result.push(numArr[1])
    
    if(numArr[numArr.length - 1] < numArr[numArr.length - 2]){
        let temp = numArr[numArr.length - 1]
        numArr[numArr.length - 1] = numArr[numArr.length - 2]
        numArr[numArr.length - 2] = temp
    }
    for(let i = 2; i < numArr.length - 2; i++) {
        if(numArr[numArr.length - 2] < numArr[i]){
            let temp = numArr[i]
            numArr[i] = numArr[numArr.length - 2]
            numArr[numArr.length - 2] = temp
        }
    }
    result.push(numArr[numArr.length - 2])
    return result;
}
console.log(secondMost([1, 3, 2, 9, 5]))
console.log(secondMost([1, 3, 2, 9]))
console.log(secondMost([1, 3]))