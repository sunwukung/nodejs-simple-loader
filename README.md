##NodeJS Simple Loader

I created this module to make dependency injection and testing express applications a little simpler.

### Example
In the context of an express application - wrap app.js in a bootstrap.js file:

    var path = require('path');
    var myapp = require('./app.js');

    var loader = require('nodejs-simple-loader');

    // give the loader the root directory
    // and an object mapping module names
    // to paths relative to that root
    loader.init(path.normalize(__dirname), require('./server/config/loader.js'));

    myapp.start();

The object map passed to the loader looks like this:

    // live loader config
    module.exports = {
        'dataBaseService': '/lib/dataBaseService.js'
    }

    // test loader config
    module.exports = {
        'dataBaseService': '/mocks/dataBaseService.js'
        'otherService' : {other: 'service'} // takes objects too...
    };

Then, rather than directly calling require...

    var myDatabaseService = loader.load('dataBaseService');


If no alias is located in the loader - then it will just default to a regular require.
This has two benefits: You can swap in any version of the class, and it also removes the need
to use relative path names throughout an application. It also allows you to specify mocks at any point in the app, rather than in the immediate test suite.
