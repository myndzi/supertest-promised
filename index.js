'use strict';

var request = require('supertest'),
    Promise = require('bluebird');

var fakeApp = {
    address: function () {
        return {
            address: '0.0.0.0',
            port: 0
        };
    },
    listen: function () {
    }
};

var proto = Object.getPrototypeOf(request(fakeApp).get('/'));

var origEnd = proto.end;
proto.end = function (fn) {
    var self = this;
    if (typeof fn === 'function') {
        return origEnd.apply(self, arguments);
    }
    var deferred = Promise.defer();
    origEnd.call(self, deferred.callback);
    return deferred.promise;
};

module.exports = request;
