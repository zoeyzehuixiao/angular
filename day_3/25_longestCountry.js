function longestCountryName(arr){
    return arr.reduce((prev, curr) => 
        prev.length >= curr.length? prev : curr
    )
}
console.log(longestCountryName(["Australia", "Germany", "United States of America"]))