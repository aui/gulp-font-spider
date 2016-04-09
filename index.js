'use strict';

var FontSpider = require('font-spider');
var through = require('through2');
var gutil = require('gutil');
var util = require('util');

var createStream = function(options) {
    return through.obj(function(file, enc, callback) {
        var fontSpider;

        if (file.isBuffer && file.isBuffer()) {
            fontSpider = new FontSpider(file.path, options);

            fontSpider.then(function(webFonts) {
                var json = JSON.stringify(webFonts, null, 4);
                json = JSON.parse(json);
                gutil.log(util.inspect(json, {
                    colors: true,
                    depth: null
                }));
                callback(null, file);
            }, callback);

        } else {
            callback(null, file);
        }
    });
};

module.exports = createStream;