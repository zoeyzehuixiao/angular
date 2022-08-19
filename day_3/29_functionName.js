function functionName(){
    return arguments.callee.name;
}

console.log(functionName())