// Import express
let express = require('express');
// CORS
var cors = require('cors');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// add CORS headers
app.use(cors());

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/heroes_api', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Heroes API on port " + port);
});
