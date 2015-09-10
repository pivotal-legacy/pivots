'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');

gulp.task('html', ['clean'], function () {
  return gulp.src(['./src/index.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', ['clean'], function () {
  return gulp.src('src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('watch', ['build'], function() {
  return gulp.watch(['src/main.js', 'css/main.css'], ['build'])
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('build', ['clean', 'html', 'js']);

gulp.task('default', ['watch']);
