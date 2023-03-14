const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');

const app = express(); 

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res){

    const latitude = req.body.latitude;
    const longtitude = req.body.longtitude;
    const apiKey = "db0783fd6e0dfcc0740492b38203fce1";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid="  + apiKey + "&lat=" + latitude + "&lon=" + longtitude + "&units=" + units;

    https.get(url, function(urlResponse){


        urlResponse.on("data", function(data){


            const weatherData = JSON.parse(data);

            const weatherDesc = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature is "+ temperature + " degrees celcius.</h1>");
            res.write("<h3>The weather is " + weatherDesc +"</h3>");
            res.write("<img src=" + imageURL + ">");
            res.send();

        });

    });
    

});


app.listen(3000, function(){

    console.log("Server is running on port 3000.")
}); 