"use strict";

const express    = require('express');
const bodyParser = require('body-parser'); // to read POST data
const helmet     = require('helmet'); // sets some http header for security

const app = express(); // getting app obj from express

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Have to be exported before app.use(...)
module.exports.urlencodedParser = urlencodedParser;
module.exports.router = express.Router();


// ------------ more middlewares --------->

// A debugging middleware to log request info
app.use((req, res, next) =>
{
    try
    {
        console.log(
                '\nURL', req.url, // including any get parameters
                '\n\tPATH:', req.path, // only the path
                '\n\tHOST:', req.hostname,
                '\n\tIP:', req.ip,
                '\n\tPROXIES:', req.ips,
                '\n\tTIME:', new Date().getTime(), '|', Date()
                );
    }
    catch(e)
    {
        console.log('Error', e);
    }

    next();
});

app.use(helmet());
app.use(express.static('public')); // to serve static files

// Routers
app.use('/', require('./routes/home'));
app.use('*', require('./routes/404'));

// <---------- Middlewares ends ------------


// starting server
const server =
app.listen(process.env.PORT || 9001, (err) =>
{
    if(err) console.log('Error', err);
    else    console.log('Started listening', server.address());
});

module.exports.server = server;