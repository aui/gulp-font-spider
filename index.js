'use strict';

var FontSpider = require( 'font-spider' ),
    through = require( 'through2' );

var createStream = function( options ){
    options = options || {};

    return through.obj(function( file, enc, callback ){
        var fontSpider;

        if( file.isBuffer() ){
            fontSpider = new FontSpider( file, options );

            fontSpider.then(function(){
                callback( null, file );
            });
        }
        else{
            callback( null, file );
        }
    });
};

module.exports = createStream;
