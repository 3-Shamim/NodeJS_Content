
// import routes
let apiRoutes = require("./routes/api-routes")

// import express
let express = require("express");

// initailize the app
let app = express();

// import Body parser
let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests (urlencoded)
app.use(bodyParser.urlencoded({
    extended: true
}));

// For json request body
app.use(express.json());

// app.use(express.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/restExpress', { useNewUrlParser: true });

var db = mongoose.connection;


// initialize auth
let auth = require("./config/Auth");

app.use("/api/*", auth.authentication, auth.authorization)

// send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
// app.use('/api', auth.authentication, auth.authorization, apiRoutes);
app.use('/api', apiRoutes)


// setup server port 
let port = process.env.PORT || 3000;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log(`Running mongo rest with express on port ${port}`);
});