'use strict';

var argv = require('yargs')
    .usage('Usage: $0 <image> [hand|body] [-t host] [-c keys]')
    .demand(1)
    .default('t', 'http://ai-api.easyar.com:8080').alias('t', 'host')
    .default('c', 'keys.json').alias('c', 'keys')
    .help('h').alias('h', 'help')
    .epilog('copyright 2018, sightp.com')
    .argv;

var fs = require('fs');

var imageFn = argv._[0];
var gtype  = argv._[1];
var host = argv.host;
var keys = JSON.parse(fs.readFileSync(argv.keys));

var gesture = require('./gesture')(host, keys);
var jsonBody = {
    'image': fs.readFileSync(imageFn).toString('base64')
}

if(gtype && gtype=="body"){
    gesture.body(jsonBody)
    .then(function(resp) {
        console.log(resp.result);
    })
    .fail(function(err) {
        console.log(err);
    });
}else {
    gesture.hand(jsonBody)
    .then(function(resp) {
        console.log(JSON.stringify(resp));
    })
    .fail(function(err) {
        console.log(err);
    });
}
