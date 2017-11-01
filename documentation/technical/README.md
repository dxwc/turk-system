# Notes
+ `npm run jsdoc` will generate html view of [jsDoc](http://usejsdoc.org/)
  documentation in [./jsDoc/](./jsDoc/) folder (the folder is set to be
  ignored from .gitignore)

# Documentation links
+ Express.js : <http://expressjs.com/en/4x/api.html>
+ JSDoc : <http://usejsdoc.org/>
+ EJS : <http://ejs.co/>
+ Axios : <https://github.com/axios/axios>
+ Mongoose: <http://mongoosejs.com>
+ Body-parser : <https://github.com/expressjs/body-parser>

# MongoDB notes:

## Installation
+ Database will have to installed on your computer locally for application to run
  properly. Mongodb version above 3 and under 4 should all work with setup
  of our application. Easiest way to install could be through your
  operating system's package manager, for example, on my computer running
  `sudo eopkg install mongodb` installs both server and client shell of
  latest stable mongoDB. Alternatively, you may look at the download
  options [here](https://www.mongodb.com/download-center#community).
+ The package used to communicate to mongodb here is Mongoose. This is not
  the official driver from mongoDB. The official driver, through suitable
  for use with all the functionalities we may need easily enough -when data
  types and constraints are specified, error produced on wrong inputs are
  very non-descriptive. The difference for our use being: validations in
  native driver `mongodb` is done on the database server with BSON types
  and `mongoose` will do that on node.js server of our application. No
  special instruction needed for mongoose, npm install will install this
  with other packages.

## Collection
+ Equivalent to SQL Table
+ Does not enforce a schema
+ Contains Documents
    + A set of key/value pair
    + Similar to rows in RDBMS

## Running
+ Deamon: `mongod` -- essentially the mongodb database server
    + Default database files location is `/data/db`, must exists to work if
      alternative is not provided. See `mongod --help` for list of options
    + In our application (`../../application/Makefile`):
        + Start mongodb `make start` will run :
          `sudo mongod --port 27017 --dbpath ./db_data`
        + Stops mongodb `make stop` will run :
          `sudo mongod --port 27017 --dbpath ./db_data --shutdown`
+ Client: `mongo` -- essentially the mongodb shell client
    + Can only be used while mongod is running
    + Not directly used in our application, but helpful to ensure
      everything is working properly
    + see common uses by typing `help` after running (`mongo`, sudo isn't
      necessary)
    + Show general info about databases collection etc: `db.stats()`
    + Example usages:
    + `show dbs;` -- shows list of database
    + `use turk_system;` -- go into db
    + `show_collections;` -- lists collections in db that is currently in `use`
    + Get information about a collection after running `use <db_name>` example:
      `db.getCollectionInfos({ name : 'users' });`