 const moogose = require("mongoose");

 moogose.connect("mongodb://localhost:27017/transactions",{
     useCreateIndex: true,
     useFindAndModify: false,
     useNewUrlParser: true
 }).then(db => console.log('Db is connected', db.connection.host));

 exports.module = moogose;