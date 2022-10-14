let AllDate = function(){
    let date = new Date();
     let DateMonthYear = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
     return DateMonthYear;
}
let getBatchInfo = function(){
    console.log( "Lithium, W3D3, the topic for today is Nodejs module system" )
    return ("look at up for result");
}

module.exports.myAllDate= AllDate;
module.exports.mygetinfo= getBatchInfo;