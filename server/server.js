"use strict";

const express = require('express');
const path = require('path'); // needed to use path.resolve
const bodyParser = require('body-parser'); // to read POST data
const helmet = require('helmet'); // sets some http header for security

const app = express(); // getting app obj from express
const PORT = process.env.PORT || 5000;

// ------------ more middlewares --------->

// A debugging middleware to log request info
app.use((req, res, next) => {
  try {
      console.log(
        '\nURL', req.url, // including any get parameters
        '\n\tPATH:', req.path, // only the path
        '\n\tHOST:', req.hostname,
        '\n\tIP:', req.ip,
        '\n\tPROXIES:', req.ips,
        '\n\tTIME:', new Date().getTime(), '|', Date()
      );
  }
  catch(e) {
    console.log('Error', e);
  }
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// starting server
const server = app.listen(PORT, (err) => {
  if(err) console.log('Error', err);
  else console.log('Started listening', server.address());
});

module.exports.server = server;
