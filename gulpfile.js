'use strict';
var gulp = require('gulp');
var fontSpider = require('./');

gulp.task('fontSpider', function() {
    return gulp
        .src('test/*.html')
        .pipe(gulp.dest('release'))
        .pipe(fontSpider({
            silent: false,
            backup: false,
            ignore: ['*.woff2']
        }));
});

gulp.task('default', ['fontSpider']);