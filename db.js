const mongoose = require("mongoose");

var mongoDBURL = 'mongodb+srv://mutyalakalyani211:ytLc6WR1fnXKUzyf@room.jkwe5qa.mongodb.net/bookit'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose
