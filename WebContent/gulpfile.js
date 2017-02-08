var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	del = require('del');

// Default
gulp.task('default', function(){
	console.log('Default task :)... still working...');
});

// JSHint - displays javascript file errors
gulp.task('jshint', function() {
	  return gulp.src('app/scripts/**/*.js')
	  .pipe(jshint())
	  .pipe(jshint.reporter(stylish));
	});

//Clean - cleans dist folder
gulp.task('clean', function(){
	return del(['dist/**']);
});