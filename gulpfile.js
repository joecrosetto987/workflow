var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'); //nodejs command to get handle to gulp methods and properties

var coffeeSources = ['components/coffee/tagline.coffee']
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
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
		.pipe(gulp.dest('builds/development/js'))
})