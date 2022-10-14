const lodash = require('lodash');
let Allmonths =["January","February","March","April","May","June","july","August","September","October","November","December"];
console.log( "Chunk Function===>",lodash.chunk(Allmonths,4));


let oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(lodash.tail(oddNum,9))

let array1 = [1,2]
let array2 = [2,3]
let array3 = [3,4]
let array4 = [4,5]
let array5 = [5,6]
console.log(lodash.union(array1,array2,array3,array4,array5));


let pairs = [['name','Ankush Rai'] , ['number',2222222] , ['location','delhi']];
console.log(lodash.fromPairs(pairs))