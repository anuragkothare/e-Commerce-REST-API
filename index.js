const express = require('express');
const appConfig = require('./config/appConfig');

const app = express();

app.get('/hello', (req, res) => res.send("Hello Moto!!!"));


app.listen(appConfig.port, () => console.log("Listening on port 5000"));

