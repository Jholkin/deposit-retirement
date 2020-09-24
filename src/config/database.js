 const moogose = require("mongoose");
 require('dotenv').config({ path: './variables.env' })

 moogose.set('useFindAndModify', false);

 moogose.connect('mongodb+srv://terry:vargassantacruz@cluster0.rg7e0.mongodb.net/test?retryWrites=true&w=majority', {

     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true,

 }).then(db => console.log('Db is connected', db.connection.host));