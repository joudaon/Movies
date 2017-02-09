var gulp = require('gulp'), //The streaming build system (https://www.npmjs.com/package/gulp)
	jshint = require('gulp-jshint'), //Highlights js code errors (https://www.npmjs.com/package/gulp-jshint)
	stylish = require('jshint-stylish'), //Stylish reporter for JSHint (https://www.npmjs.com/package/jshint-stylish)
	del = require('del'), //Deletes folders (https://www.npmjs.com/package/del)
	concat = require('gulp-concat'), //Concatenates files (https://www.npmjs.com/package/gulp-concat)
	uglify = require('gulp-uglify'), //Minify files with UglifyJS. (https://www.npmjs.com/package/gulp-uglify)
	babel = require('gulp-babel'), //Fixed lambda expressions (https://www.npmjs.com/package/gulp-babel)
	usemin = require('gulp-usemin'), //Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views). (https://www.npmjs.com/package/gulp-usemin)
	rev = require('gulp-rev'), //Gives a hash name to the filename (https://www.npmjs.com/package/gulp-rev)
	ngAnnotate = require('gulp-ng-annotate'), //Add angularjs dependency injection annotations with ng-annotate (https://www.npmjs.com/package/gulp-ng-annotate)
	cleanCSS = require('gulp-clean-css'), //Minifies css (https://www.npmjs.com/package/gulp-clean-css)
	imagemin = require('gulp-imagemin'), //Optimizes images (https://www.npmjs.com/package/gulp-imagemin)
	cache = require('gulp-cache'), //A temp file based caching proxy task for gulp (https://www.npmjs.com/package/gulp-cache)
	notify = require('gulp-notify'); //Notification plugin for gulp (https://www.npmjs.com/package/gulp-notify)

/*-------------*/
/*Testing tasks*/
/*-------------*/

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

//Whenever a js file is updated jshint is run
gulp.task('watchJSerrors', function() {
  gulp.watch('app/scripts/**/*.js', ['jshint']);
});

/*-----------------*/
/*End Testing tasks*/
/*-----------------*/

//-------------------------------------------//
//Default task ($gulp runs this default task)//
//-------------------------------------------//
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});	

// JSHint - displays javascript file errors
gulp.task('jshint', function() {
	return gulp.src('app/scripts/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter(stylish));
	});

// Clean - cleans dist folder
gulp.task('clean', function(){
	return del(['dist/**'])
});

//Usemin - js and css files are concatenated and minified. index.html js and css links are changed.
gulp.task('usemin',['jshint'], function () {
	  return gulp.src('./app/**/*.html')
	      .pipe(usemin({
	        css:[cleanCSS(),rev()],
	        js: [babel({presets: ['es2015']}),ngAnnotate(),uglify(),rev()]
	      }))
	      .pipe(gulp.dest('dist/'));
	});

//Imagemin - Optimizes image files 
gulp.task('imagemin', function(){
	return del(['dist/img']), gulp.src('app/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images optimization task completed' }));
});

//copyfonts - bootstrap and font-awesome fonts are piped into /dist/fonts folder
gulp.task('copyfonts', ['clean'], function() {
	   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
	   .pipe(gulp.dest('./dist/fonts'));
	   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
	   .pipe(gulp.dest('./dist/fonts'));
	});