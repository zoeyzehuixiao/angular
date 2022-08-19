function binarySearch(n, arr){
    //1, 2, 3, 5
    let left = 0;
    let right = arr.length - 1;
    while(left <= right){
        let mid = parseInt((left + right) / 2);
        if(n === arr[mid]){
            return mid;
        }else if(n > arr[mid]){
            left = mid + 1;
        }else if(n < arr[mid]){
            right = mid - 1
        }
    }
    return -1;
}
console.log(binarySearch(7, [1, 2, 5, 7, 9]))
console.log(binarySearch(6, [1, 2, 5, 7, 9]))