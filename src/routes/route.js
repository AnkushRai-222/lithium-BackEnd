const express = require('express');
const router = express.Router();

//assingment 1st 
router.get('/sol1',function(req,res){
    let arr =[ 1,2,3,5,6];
    let n = arr.length+1;
    let total = n*(n+1)/2
    let sum =0;
    for(let i =0 ;i<arr.length;i++){
        sum = sum + arr[i];
    }
    let missing = total - sum ;
    res.send({missingNumber:missing});
})
// asssingment 2nd
router.get('/sol2',function(req,res){
    let array = [33,34,35,37,38,39]
    let n = array.length+1;
    let first = array[0];
    let last = array[array.length-1]

    var total = n*(first+last)
    total = total/2;
    let output = 0;

    for(let i = 0 ; i<array.length;i++){
        output = output+array[i];
    }
    let missing = (total - output);

    res.send({missingNumber:missing})
})

// Assingment of the day 

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
]

router.post('/players',function(req,res){
    let body = req.body;
     for(let i = 0 ; i<players.length;i++){
    const element = players[i];
    if(element.name === body.name){
       return res.send({message:"Name is exist"})
    }else{
        players.push(body)
        return res.send(  { data: players , status: true }  )
    }
   }

    



})



module.exports = router;
