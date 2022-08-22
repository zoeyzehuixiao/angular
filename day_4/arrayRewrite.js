//------ .map() rewrite -------

Array.prototype.myMap = function(lambda, thisArg){
    let result = []
    for(let i = 0; i < this.length; i++){
        result.push(lambda.apply(thisArg, [this[i], i, this]));
    }
    return result
}



//--------- .myMap() test ----------------
console.log(
    [1, 2, 3, 4, 5].myMap(num => ++num) //2, 3, 4, 5, 6
)
console.log(
    [1, 2, 3, 4, 5].myMap((num, index) =>  index + num) //1, 3, 5, 7, 9
)
console.log(
    [1, 2, 3, 4, 5].myMap((num, index, array) =>  array[index] + num)
    //2, 4, 6, 8, 10
)
function callback1(num){
    return num;
}
function callback2(num, index){
    return this[index] + num;
}
console.log(
    [1, 2, 3, 4, 5].myMap(callback1)
    //1, 2, 3, 4, 5
)
const arg = [5, 6, 7, 8, 9]
console.log(
    [1, 2, 3, 4, 5].myMap(callback2, arg)
    //6, 8, 10, 12, 14
)


// --------------- .reduce() rewrite----------------
Array.prototype.myReduce = function(lambda, initialValue){
    let result = initialValue? initialValue: this[0]
    if(initialValue){
        if(this.length === 0){
            return initialValue;
        }else{
            for(let i = 0; i < this.length; i++){
                result = lambda(result, this[i], i, this)
            }
            return result;
        }
    }else{
        if(this.length === 0){
            throw new TypeError('Reduce of empty array with no initial value')
        }else if(this.length === 1){
            return this[0]
        }else{
            for(let i = 1; i < this.length; i++){
                result = lambda(result, this[i], i, this)
            }
            return result;
        }
    }
}


//------------.myReduce test----
const getMax = (a, b) => Math.max(a, b);
// callback is invoked for each element in the array starting at index 0
x = [1, 100].myReduce(getMax, 50); // 100
y = [    50].myReduce(getMax, 10); // 50
// callback is invoked once for element at index 1
z = [1, 100].myReduce(getMax);     // 100
// callback is not invoked
a = [    50].myReduce(getMax);     // 50
b = [      ].myReduce(getMax, 1);  // 1

console.log(x, y, z, a, b)
try{
    [      ].reduce(getMax) //type error
}catch(e){
        console.log(e.message)
}



