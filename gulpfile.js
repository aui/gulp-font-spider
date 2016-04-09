'use strict';
var gulp = require('gulp');
var fontSpider = require('./');

gulp.task('fontSpider', function() {
    return gulp.src('./release/index.html')
        .pipe(fontSpider({
            backup: false,
            ignore: ['*.woff2']
        }));
});

gulp.task('default', ['fontSpider']);