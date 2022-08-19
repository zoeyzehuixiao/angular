function generateId(length){
    const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for(let i = 0; i < length; i++){
        id += char_list.charAt(Math.floor(Math.random() * char_list.length))
    }
    return id
}
console.log(generateId(5))