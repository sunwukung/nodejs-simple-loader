var _         = require('lodash'),
    should    = require('should'),
    loader    = require('../lib/simple-loader.js'),
    path      = require('path'),
    copy;


var shallowCopy = function(o) {
  var copy = Object.create(o),
    prop;
  for (prop in o) {
    if (o.hasOwnProperty(prop)) {
      copy[prop] = o[prop];
    }
  }
  return copy;
};

describe('loader::api', function () {

    // this is to prevent leakages if being run
    // in the context of a test suite that uses
    // loader.js
    before(function () {
        copy = shallowCopy(loader);
        loader.reset();
    });

    after(function() {
        loader.origin = copy.origin;
        loader.specs = copy.specs;
    });

    it('has a method "init"' ,function () {
        loader.should.have.property('init');
    });

    it('has a method "load"', function () {
        loader.should.have.property('load');
    });

    it('returns objects if they\'re available in specs arg', function () {
        var o;
        loader.init('foo', {
            'bar': {msg: 'baz'}
        });
        o = loader.load('bar');
        o.should.have.property('msg');
        o.msg.should.equal('baz');
    });

    it('returns objects using require(origin + id)', function () {
        var o,
            origin = path.normalize(__dirname + '/');

        loader.init(origin, {
            'myService.js': 'fixtures/mock.js'
        });

        o = loader.load('myService.js');
        o.should.have.property('connect');
    });

    it('returns objects using regular require statements if no spec matches', function () {
        var o;
        loader.init('foo');// no mocks
        o = loader.load('lodash');
        o.should.have.property('isFunction');
    });

});
