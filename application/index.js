// Starting point for the whole application

const express = require('express');

const app = express();

/** Set view engine to ejs and set directory to look up ejs file to ./views/ */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//>>>>>---Routes--->>>>>
app.use('/', require('./routes/home.js'));
app.use('*', require('./routes/404.js')); // should be last one in order of routes
//<<<<<---Routes---<<<<<

/** Server listen for requests on port 9001 or if any port specified in environmental
 * variable PORT */
const server = app.listen('9001' || process.env.PORT, () =>
{
    console.log('Listening on', server.address());
});