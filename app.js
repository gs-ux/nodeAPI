const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require('path')

const httpsOption = {
    key : fs.readFileSync(path.join(__dirname, 'ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl.pem'))
}

let app = express();
app.get('/test', (req, res) => {
  res.send('hello')
})
https.createServer(httpsOption, app).listen(4000);
console.log('running')
