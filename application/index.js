// Starting point for the whole application

const express = require('express');

/** http://expressjs.com/en/4x/api.html */
const app = express();

/** Server listen for requests on port 9001 or if any port specified in environmental
 * variable PORT */
const server = app.listen('9001' || process.env.PORT, () =>
{
    console.log('Listening on', server.address());
});