// Express
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
const PORT = 3000

// Database
const db = require("./src/database/Database")

// Response headers
app.use(async function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

// Register routes
app.use("/api/contacts", require('./src/routes/ContactRouter')(db))

app.listen(PORT, function() {
    console.log("App is listening on port ", PORT)
});

// Init database with contacts.json data
require('./src/scripts/initDbByJson')(db)




