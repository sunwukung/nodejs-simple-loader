
module.exports = function(grunt) {
/*global module:false*/
  var path = require('path');
  var p = path.normalize(__dirname);
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        //grep: '*-tests.js', - why doesn't this work?
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src : 'test/simple-loader-test.js'
      }
    },
    jshint : {
      options: {
          jshintrc: path.normalize(__dirname + '/.jshintrc')
        },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'test/*.js'
      ]
    }
  });

  grunt.registerTask('test', ['simplemocha']);
};
