'use strict';

var request = require('superagent');
var Q = require('q');
Q.longStackSupport = true;

var auth = require('./auth');

function gestureClient(host, keypair) {

    function errorJson(json) {
        return new Error(JSON.stringify(json, null, 2));
    }

    function done(resolve, reject) {
        return function(err, res) {
            if (err) {
                reject(err);
            } else {
                var body = res.body;
                if (body.statusCode) reject(errorJson(body));
                else resolve(body);
            }
        };
    }

    function ping() {
        return Q.promise(function(resolve, reject) {
            request.get(host + '/ping')
            .end(done(resolve, reject));
        });
    }

    function body(target) {
        return Q.promise(function(resolve, reject) {
            request.post(host + '/v1/pose/body')
            .send(auth.signParams(keypair, target))
            .end(done(resolve, reject));
        });
    }


    function hand(image) {
        return Q.promise(function(resolve, reject) {
            request.post(host + '/v1/pose/hand')
            .send(auth.signParams(keypair, image))
            .end(done(resolve, reject));
        });
    }

    function handToken(body, token) {
        return Q.promise(function(resolve, reject) {
            request.post(host + '/v1/pose/hand')
            .set('Authorization', token)
            .send(body)
            .end(done(resolve, reject));
        });
    }

    function bodyToken(body, token) {
        return Q.promise(function(resolve, reject) {
            request.post(host + '/v1/pose/body')
            .set('Authorization', token)
            .send(body)
            .end(done(resolve, reject));
        });
    }


    return {
        ping: ping,
        body: body,
        hand: hand,
        bodyToken: bodyToken,
        handToken: handToken
    };

}

module.exports = gestureClient;
