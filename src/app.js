const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/database');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes


// Configuration
const port = 3000;


// Middleware
app.use(express.json());

// Routes
const retiremetRouter = require('./routes/retirement');
const depostiRouter = require('./routes/deposit');

// Functions
app.get('/', (req, res) => {
    res.send('Hello Microservices');
});

app.use('/api/retirement', retiremetRouter);
app.use('/api/deposit', depostiRouter);

app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});

module.exports = app;