## What?

This is a simple module that converts supertest's API to return promises if no callback is supplied to the 'end' method. It uses Bluebird 2.0 or 3.0, and the returned promise has all the useful methods thus provided.

Bluebird and supertest are expected as peerDependencies, but also listed as dev dependencies so that you may use `npm install`. This module was written for Bluebird 2.2.2 and supertest 0.13.0, but the peerDependencies are listed as '*' to avoid dependency mess. It is safe to use with Bluebird 3.x.

## How's it work?

I create a stub app with the functions that supertest expects, call request(app).get('/'), and get that object's prototype, then wrap the prototype's 'end' function to return a promise if no function is given as the first argument. If the first argument is a function, the method call is passed transparently on to the original method.

## Usage

Just use supertest as normal, but don't bother supplying a callback to the `end` method. If no callback is supplied, `end` will return a promise instead.

    var request = ('supertest-promised');
    var app = require('express')();

    ...

    // assuming mocha
    function validateArrayContents(item) { return item > 0; }

    describe('spec', function () {
        it('should do stuff', function () {
            return request(app)
                .get('/foo')
                .expect(200)
                .expect('Content-Type', /json/)
                .end().get('body') // bluebird's .get, not supertest's .get
                .each(validateArrayContents);
        });
    });
