let axios = require("axios");

let getStates = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getDistricts = async function (req, res) {
  try {
    let id = req.params.stateId;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getByPin = async function (req, res) {
  try {
    let pin = req.query.pincode;
    let date = req.query.date;
    console.log(`query params are: ${pin} ${date}`);
    var options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`,
    };
    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getOtp = async function (req, res) {
  try {
    let blahhh = req.body;

    console.log(`body is : ${blahhh} `);
    var options = {
      method: "post",
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: blahhh,
    };

    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports.getStates = getStates;
module.exports.getDistricts = getDistricts;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;

///Assingment 1 --->WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date. This is a very basic assignment and totally along the lines of what we covered in the session


const getByDistricts = async function(req,res){
  try  {
    let dis_id = req.query.district_id;
    let date = req.query.date;

    let options = {
        method:'get',
        url:`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${dis_id}&date=${date}`
    }

    let  result = await axios(options);
    let data = result.data
    return  res.status(200).send({msg:data})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

module.exports.getByDistricts = getByDistricts;

//Assingment 2 ---> meme

const getMemeImage = async function(req,res){
  try{
    
    let templateId = req.query.template_id
    let text_0 = req.query.text0;
    let text_1 = req.query.text1;
    let userName = req.query.username
    let password = req.query.password

    let options = {
      method:'post',
      url:`https://api.imgflip.com/caption_image?template_id=${templateId}&text0=${text_0}&text1=${text_1}&username=${userName}&password=${password}`
    }
    let result  = await axios(options);
    let data = result.data
    return res.status(200).send({msg:data});
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}
module.exports.getMemeImage = getMemeImage

// Assingment 3 ---> weather 

const getWeather  = async function(req,res){
  try{
  let q = req.query.q;
  let appId =  req.query.appid

  let options = {
    method:'get',
    url:`http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appId}`
  }

  let result = await axios(options);
  let data = result.data.main.temp;

  return res.status(200).send({city:q,temperature:data})
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
} 
}

module.exports.getWeather = getWeather;


const getSortedCity  = async function(req,res){
 try{
  const cities =  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
  const cityArray = [];

  for(let i = 0 ; i<cities.length;i++){
    let obj = {city:cities[i]}
   
    let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=06e0a71ce05e567ba5f45d0e5a9a5bc2`);

    obj.temp = result.data.main.temp
    cityArray.push(obj)
  }

  let sortedWeather = cityArray.sort(function(a,b){return a.temp - b.temp})

  res.status(200).send({status:true,data:sortedWeather})
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
} 
}

module.exports.getSortedCity = getSortedCity