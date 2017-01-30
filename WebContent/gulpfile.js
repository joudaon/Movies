var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

// JSHint
gulp.task('default', function() {
	  return gulp.src('app/scripts/**/*.js')
	  .pipe(jshint())
	  .pipe(jshint.reporter(stylish));
	});

