function amountToCoins(amount, coins){
    if(amount === 0) return []
    if(amount >= coins[0]){
        console.log("test")
        return [coins[0]].concat(amountToCoins(amount - coins[0], coins))
    }else{
        return amountToCoins(amount, coins.slice(1))
    }
}
console.log(amountToCoins(46, [25, 10, 5, 2, 1]))