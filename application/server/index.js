// This file is entry point and bootstraps express application

const express = require('express');
const path = require('path');
const passport = require('passport');
// Port
const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');
const configureRoutes = require('./routes');

const app = express();

configureServer(app, passport);
configureRoutes(app, passport);

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
