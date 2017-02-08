var gulp = require('gulp'),
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'),
	del = require('del'), //Deletes folders
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'), // Fixed lambda expressions
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'), //Gives a hash name to the filename
	ngAnnotate = require('gulp-ng-annotate'); //Add angularjs dependency injection annotations with ng-annotate

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

// Clean - cleans dist folder
gulp.task('clean', function(){
	return del(['dist/**']);
});

// ConcatenateJS - Concatenates all js files into all.js file and uglifies it.
gulp.task('concatenateJS', function(){
	return gulp.src('app/scripts/**/*.js')
	.pipe(ngAnnotate())
	.pipe(babel({presets: ['es2015']}))
	.pipe(concat('all.min.js'))
	.pipe(usemin())
	.pipe(uglify().on('error', function(e){
            console.log(e);
         }))      
    .pipe(rev())  
	.pipe(gulp.dest('dist'))
});

// watchJSfiles - Watches for changes in any js file and executes concatenateJS task
gulp.task('watchJSfiles', function(){
	gulp.watch('app/scripts/**/*.js', ['concatenateJS']);
});

