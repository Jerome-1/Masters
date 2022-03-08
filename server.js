//Creating a server in node.js that will use index.html as the focus point. 
const express = require('express');
const path = require('path');

const httpPort = 80;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html')) //Server will generate index.html
});

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
}); 