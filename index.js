'use strict';

var fontSpider = require('font-spider');

var through = require('through2');
var gutil = require('gutil');
var util = require('util');

var htmlFiles = null;

function createStream(options) {

    function bufferContents(file, enc, callback) {

        // ignore empty files
        if (file.isNull()) {
            callback(null);
            return;
        }

        if (file.isBuffer && file.isBuffer()) {

            if (!htmlFiles) {
                htmlFiles = [];
            }
            htmlFiles.push(file.path);
            callback(null, file);

        } else {
            callback(null, file);
        }

    }


    function endStream(callback) {

        if (!htmlFiles || htmlFiles.length === 0) {
            callback();
            return;
        }

        fontSpider(htmlFiles, options).then(function(webFonts) {

            webFonts = JSON.stringify(webFonts, null, 4);
            webFonts = JSON.parse(webFonts);
            gutil.log(util.inspect(webFonts, {
                colors: true,
                depth: null
            }));

            callback(null);

        }).catch(callback);


        htmlFiles = null;
    }


    return through.obj(bufferContents, endStream);
}

module.exports = createStream;