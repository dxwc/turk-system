// Server configuration
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // sets some http header for security
const mongoose = require('mongoose'); // MongoDB object modeling tool designed to work in an asynchronous environment
const flash = require('connect-flash');
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const cookieParser = require('cookie-parser');
const session = require('express-session');

const CORS_WHITELIST = require('./constants/frontend');
const configDB = require('./config/database');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = (app, passport) => {
  mongoose.connect(configDB.url); // connect to our database
  // require('./config/passport')(passport); // pass passport for configuration

  // A debugging middleware to log request info
  // app.use((req, res, next) => {
  //   try {
  //       console.log(
  //         '\nURL', req.url, // including any get parameters
  //         '\n\tPATH:', req.path, // only the path
  //         '\n\tHOST:', req.hostname,
  //         '\n\tIP:', req.ip,
  //         '\n\tPROXIES:', req.ips,
  //         '\n\tTIME:', new Date().getTime(), '|', Date()
  //       );
  //   }
  //   catch(e) {
  //     console.log('Error', e);
  //   }
  //   next();
  // });

  app.use(morgan('dev')); // log every request to the console
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());

  app.set('view engine', 'ejs'); // set up ejs for templating

  // required for passport
  app.use(session({ secret: 'kjfdk1231lkdfsa0DGdkCa23k2' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

};

module.exports = configureServer;
