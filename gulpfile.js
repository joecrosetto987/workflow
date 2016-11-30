var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'); //nodejs command to get handle to gulp methods and properties

var coffeeSources = ['components/coffee/tagline.coffee']
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];
// log is an arbitrary name
gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true})    //piping the src file to a method in the coffee object, instanciated above
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts')) // pipe the now compiled coffee script to the scripts folder
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({			// set up preferences here instead of a config file
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		})
		.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);

