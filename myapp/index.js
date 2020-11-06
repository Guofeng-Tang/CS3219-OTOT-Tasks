let express = require('express');
let bodyParser = require('body-parser');
const getDB = require('./db')
let cors = require("cors");

// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors());

// Connect to Mongoose
getDB()

// Setup server port
let port = 8081;

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to my Task B site'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = {
    app,
};
