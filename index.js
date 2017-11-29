/**
 * Starting point for the application
 * Mongodb: port 27017, database name: turk_system
 * Express server: port 9001
 */

const mongoose = require('mongoose');
mongoose.Promise = Promise; // use ES6 promise for mongoose promise
require('./db/models'); // defines all the data model (schema)

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const express = require('express');
const app = express();

require('ejs').delimiter = '?';
/** Set view engine to ejs and set directory to look up ejs file to ./views/ */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/** Serves requested files if found in ./static_files folder */
app.use(express.static(__dirname + '/static_files'));

/** session middleware to save data to validate user */
app.use(session({
    secret: 'foo',
    store: new MongoStore({ mongooseConnection : mongoose.connection }),
    // using existing mongodb connection
    ttl: .50 * 60 * 60, // session will exire in half an hour
    resave: true,
    saveUninitialized: true
}));

// ** A middleware to have access to POST sent data (ex: req.body.some_data) : **/
// For content type : application/x-www-form-urlencoded (default for all POST or GET)
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json()); // For parsing application/json content type

//>>>>>---Routes--->>>>>
app.use(require('./routes/404')); // should be last one in order of routes
//<<<<<---Routes---<<<<<

// Connect mongodb on localhost at port 27017 on database turk_system
mongoose.connect('mongodb://localhost:27017/turk_system', { useMongoClient: true })
.then((db) =>
{
    console.log('Connected to MongoDB server on port: 27017, databse: turk_system');

    /** Server listen for requests on port 9001 or if any port specified in
     * environmental variable PORT */
    const server = app.listen('9001' || process.env.PORT, () =>
    {
        console.log('Express server started listening on', server.address());
    });
})
.catch((err) =>
{
    console.log('Mongo DB connection Error, server will not attemp starting', err);
});