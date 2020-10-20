 const mongoose = require("mongoose");

 mongoose.connect("mongodb://mongo/transactions",{
     useCreateIndex: true,
     useFindAndModify: false,
     useNewUrlParser: true
 }).then(db => console.log('Db is connected', db.connection.host))
 .catch(err => console.error(err));

 exports.module = mongoose;