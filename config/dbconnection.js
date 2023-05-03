const mongoose = require("mongoose")

mongoose.set("strictQuery", false);

const dbconnection = mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    else{
        console.log(`Successfully connected to ${process.env.MONGO_URL}`);
    }
})

module.exports = dbconnection;