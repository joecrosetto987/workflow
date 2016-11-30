var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'); //nodejs command to get handle to gulp methods and properties

var coffeeSources = ['components/coffee/tagline.coffee']

// log is an arbitrary name
gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true})    //piping the src file to a method in the coffee object, instanciated above
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts')) // pipe the now compiled coffee script to the scripts folder
});