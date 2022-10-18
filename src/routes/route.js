const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    console.log("The path params in the request are : ", req.params)
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})


// Example 1 for path params
router.get('/students/:studentName', function(req, res){
    // ':' denotes that the following part of route is a variable
    // The value of this variable is what we are sending in the request url after /students
    // This value is set in the form of an object inside req.params
    // The object contain key value pairs
    // key is the variable in the route
    // value is whatever dynamic value sent in the request url
    let myParams = req.params

    // params attribute is fixed in a request object
    // params contains the path parameters object
    console.log("The path params in the request are : ", myParams)
    res.send('The full name is ' + myParams.studentName )
})

// Example 2 for path params
router.get('/student-details/:name', function(req, res){
    let requestParams = req.params
    console.log("This is the request ", requestParams)
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    res.send('Dummy response')
})


//This is a asssingment of the day
router.get('/movies',function(req,res){
    let myMovie = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send(myMovie)
})

module.exports = router;

// 2nd Assingment
router.get('/movies/:indexNumber',function(req,res){
    let myMovie = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let index  = req.params.indexNumber 
if(index > (myMovie.length-1)){
    res.send("invalid index")
   }else{
    res.send(myMovie[index])
   }

})

//3rd Assingment
router.get('/films',function(req,res){
    let myFilms = [ {
        id: 1,
        name: 'The Shining'
       }, {
        id: 2,
        name: 'Incendies'
       }, {
        id: 3,
        name: 'Rang de Basanti'
       }, {
        id: 4,
        name: 'Finding Nemo'
       }]
       res.send(myFilms)
       
})


//4th Assingment
router.get('/film/:filmid',function(req,res){
    let myFilms = [ {
        id: 1,
        name: 'The Shining'
       }, {
        id: 2,
        name: 'Incendies'
       }, {
        id: 3,
        name: 'Rang de Basanti'
       }, {
        id: 4,
        name: 'Finding Nemo'
       }]
    let index  = req.params.filmid 
    let movie = myFilms.find(film => film.id == index);

    if(movie){
        res.send(movie)
    }else{
        res.send(" movie does not exist with this id")
    }
     
        
})
