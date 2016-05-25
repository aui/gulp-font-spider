'use strict';

var fontSpider = require('font-spider');
var colors = require('colors/safe');
var through = require('through2');
var gutil = require('gutil');
var fs = require('fs');
var path = require('path');
var htmlFiles = null;

function createStream(options) {

    options = options || {};

    if (!options.resourceBeforeLoad) {
        options.resourceBeforeLoad = function(file) {
            if (/https?/.test(file)) {
                gutil.log('Load', colors.cyan(file));
            }
        };
    }


    function bufferContents(file, enc, callback) {

        if (file.isNull()) {
            callback(null);
            return;
        }

        if (file.isBuffer && file.isBuffer()) {
            if (!htmlFiles) {
                htmlFiles = [];
            }
            htmlFiles.push(file);
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

            webFonts.forEach(function(webFont) {

                gutil.log('Font family', colors.green(webFont.family));
                gutil.log('Original size', colors.green(webFont.originalSize / 1000 + ' KB'));
                gutil.log('Include chars', webFont.chars);
                gutil.log('Font id', webFont.id);
                gutil.log('CSS selectors', webFont.selectors.join(', '));

                webFont.files.forEach(function(file) {
                    if (fs.existsSync(file.url)) {
                        gutil.log('File', colors.cyan(path.relative('./', file.url)) + ' created: ' +
                            colors.green(file.size / 1000 + ' KB'));
                    } else {
                        gutil.log(colors.red('File ' + path.relative('./', file.url) + ' not created'));
                    }
                });
            });

            callback(null);

        }).catch(callback);


        htmlFiles = null;
    }


    return through.obj(bufferContents, endStream);
}

module.exports = createStream;