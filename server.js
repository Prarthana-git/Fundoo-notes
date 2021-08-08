const express=require('express');

//create express app
const app=express();

//parsing the request from user
app.use(express.urlencoded({ extended: true }))

//parse the request from user
app.use(express.json())

//configuring the database
const dbConfig=require('./config/database.config');
const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

//connecting to the database
mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,useUnifiedTopology: true
}).then(() =>{
    console.log("Successfully connected to the database");
}).catch(err => 
    {
        console.log('could not connect to the database.Exiting now..',err);
        process.exit();
    });

//define a simple route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to FundooNotes"});
});
 require('.app/routes/note.routes.js') (app);
app.listen(3000,() => {
  console.log("server is listening on port 3000");
});