const mongoose = require("mongoose")

// const dbconnection = mongoose.connect(mongo_url, {useNewUrlParser: true, useUnifiedTopology: true})
// .then((res) => console.log("hello"))
// .catch (error => console.log(error))
// dbconnection().catch(err => console.log(err));

// async function dbconnection() {
//    mongoose.connect(mongo_url, {useNewUrlParser: true, useUnifiedTopology: true})
//   console.log(`Connected to ${mongo_url}`);
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
mongoose.set("strictQuery", false);

const dbconnection = mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    else{
        console.log(`Successfully connected to ${process.env.MONGO_URL}`);
    }
})

module.exports = dbconnection;