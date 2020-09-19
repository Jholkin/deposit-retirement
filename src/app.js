const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Microservices');
});

app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});