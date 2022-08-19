function sayHello(name, callback){
    callback(name);
}
function hello(name){
    console.log(`Hello ${name}`);
}
sayHello("Zoey", hello);