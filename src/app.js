const express = require('express');
const app = express();

// Configuration
const port = 3000;


// Middleware
app.use(express.json());

// Routes
const retiremetRouter = require('./routes/retirement');


// Functions
app.get('/', (req, res) => {
    res.send('Hello Microservices');
});

app.get('api/retirement', retiremetRouter);

app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});