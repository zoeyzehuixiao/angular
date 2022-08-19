function bubbleSort(arr){
    let flag = true;
    while(flag){
        flag = false;
        for(let i = 0; i < arr.length - 1; i++){
            if(arr[i] < arr[i + 1]){
                let temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp;
                flag = true;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([1, 7, 9, 2, 5, 7]))
console.log(bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]))
