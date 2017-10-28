// Starting point for the whole application

const express = require('express');

const app = express();

//>>>>>---Routes--->>>>>
app.use('*', require('./routes/404.js'));
//<<<<<---Routes---<<<<<

/** Server listen for requests on port 9001 or if any port specified in environmental
 * variable PORT */
const server = app.listen('9001' || process.env.PORT, () =>
{
    console.log('Listening on', server.address());
});