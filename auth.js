'use strict';

var crypto = require('crypto');

function genSign(params, appSecret) {
    var paramsStr = Object.keys(params).sort().map(function(key) {
        return key+params[key];
    }).join('') + appSecret;

    return crypto.createHash('sha256').update(paramsStr).digest('hex');
}

// Deprecated
function signParamsByAppkey(keypair, params) {
    params = params || {};
    params.timestamp = new Date().getTime();
    params.aiKey = keypair.aiKey;
    params.signature = genSign(params, keypair.aiSecret);
    return params;
};

function signParamsByAPIKeys(keypair, params) {
    params = params || {};
    params.timestamp = new Date().getTime();
    params.appId = keypair.appId;
    params.apiKey = keypair.apiKey;
    params.signature = genSign(params, keypair.apiSecret);
    return params;
};

function getUACToken(keypair, params) {
    params = params || {};
    params.timestamp = new Date().getTime();
    params.appId = keypair.appId;
    return params;
};

exports.signParams =  signParamsByAPIKeys;