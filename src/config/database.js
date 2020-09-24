 const moogose = require("mongoose");


 moogose.set('useFindAndModify', false);

 moogose.connect('mongodb+srv://terry:vargassantacruz@cluster0.rg7e0.mongodb.net/<dbname>?retryWrites=true&w=majority', {

     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true,

 }).then(db => console.log('Db is connected', db.connection.host));