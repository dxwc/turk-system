// Starting point for the whole application

const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('./models.js'); // defines all the data model (schema)

const express = require('express');

const app = express();

/** Set view engine to ejs and set directory to look up ejs file to ./views/ */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/** Serves requested files if found in ./static_files folder */
app.use(express.static(__dirname + '/static_files'));

// ** A middleware to have access to POST sent data (ex: req.body.some_data) : **/
// For content type : application/x-www-form-urlencoded (default for all POST or GET)
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json()); // For parsing application/json content type

//>>>>>---Routes--->>>>>
app.use('/', require('./routes/home.js'));
app.use('*', require('./routes/404.js')); // should be last one in order of routes
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
