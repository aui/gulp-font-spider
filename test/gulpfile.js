var gulp = require( 'gulp' ),
    fontSpider = require( '../index' );

gulp.task( 'fontSpider', function(){
    return gulp.src( './index.html' )
        .pipe( fontSpider() );
});

gulp.task( 'default', ['fontSpider'] );
