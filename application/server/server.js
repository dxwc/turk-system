// Server configuration
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // sets some http header for security

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = app => {
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

  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  //
  app.use(bodyParser.json());

  app.use(helmet());


};

module.exports = configureServer;
