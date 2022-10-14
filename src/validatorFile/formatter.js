let trim = function(){
    let arr =["Ankush","rai","Bhopal","Madhya Pradesh"]
    let val = arr.map(el =>{
        return el.toLowerCase();
    })
    return val;
}
let trim1 = function(){
    let arr =["Ankush","rai","Bhopal","Madhya Pradesh"]
    let val1 = arr.map(el =>{
        return el.toUpperCase();
    })
    return val1;
}

module.exports.mytrim = trim
module.exports.mytrim1 = trim1