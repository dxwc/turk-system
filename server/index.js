// Entry point and bootstraps express application

const express = require('express');
const path = require('path');

const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');
const configureRoutes = require('./routes');

const app = express();

configureServer(app);
configureRoutes(app);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
