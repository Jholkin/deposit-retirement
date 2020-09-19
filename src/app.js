const express = require('express');
const app = express();

// Routes
const retiremetRouter = require('./routes/retirement');

// Configuration
const port = 3000;


// Middleware
app.use(express.json());

// Functions
app.get('/', (req, res) => {
    res.send('Hello Microservices');
});

app.use('/api/retirement', retiremetRouter);

app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});