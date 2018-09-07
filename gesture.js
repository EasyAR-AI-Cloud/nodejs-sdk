'use strict';

var request = require('superagent');
var Q = require('q');
Q.longStackSupport = true;

var auth = require('./auth');

function gestureClient(host, appKey, appSecret) {

    function signParams(params) {
        params = params || {};
        return auth.signParams(params,
            new Date().getTime(),
            appKey,
            appSecret
        );
    }

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
        var retbody = Q.promise(function(resolve, reject) {
            request.post(host + '/v1/pose/body')
            .send(signParams(target))
            .end(done(resolve, reject));
        });
        return retbody;
    }


    function hand(image) {
        return Q.promise(function(resolve, reject) {
            request.post(host + '/v1/pose/hand')
            .send(signParams(image))
            .end(done(resolve, reject));
        });
    }


    return {
        ping: ping,
        body: body,
        hand: hand
    };

}

module.exports = gestureClient;
