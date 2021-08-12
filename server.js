const express=require('express');
require('dotenv').config()
//create express app
const app=express();

//parsing the request from user
app.use(express.urlencoded({ extended: true }))

//parse the request from user
app.use(express.json())

//configuring the database
const dbConfig=require('./config/database.config.js');

//define a simple route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to FundooNotes"});
});
 require('./app/routes/routes')(app);
 
app.listen(process.env.PORT,() => {
  console.log("server is listening on port ${process.env.PORT}");
});
module.exports = app 