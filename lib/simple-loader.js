/*
simple-loader
Marcus Kielly

MIT Licensed

primary purpose is to provide a way of
injecting mocks into nodeJS modules

secondary purpose is to eliminate relative
paths in require statements
*/

var sl = {},
    _ = require('lodash'),
    path = require('path');

sl.specs = {};
sl.origin = '';


sl.init = function (origin, specs) {
    // init(string/origin, object/options)
    // origin: provides root folder of project
    // options: provides mock objects/path
    sl.origin = origin;
    if (specs) {
        sl.specs = specs;
    }
};

sl.load = function (id) {
    // load(string/id)
    // tries to locate id in mocks object
    if (sl.specs.hasOwnProperty(id)) {
        if (_.isObject(sl.specs[id])) {
            return sl.specs[id];
        }
        if (_.isString(sl.specs[id])) {
            return require(sl.origin + sl.specs[id]);
        }
        // misconfigured
        console.log('non string/object located in sl.specs');
    } else {
        return require(id);
    }
};

sl.reset = function () {
    sl.specs = {};
    sl.origin = '';
};

module.exports = sl;