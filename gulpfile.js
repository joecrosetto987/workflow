var gulp = require('gulp'),
	gutil = require('gulp-util'); //nodejs command to get handle to gulp methods and properties

// log is an arbitrary name
gulp.task('log', function() {
	gutil.log('Workflows are awesome');
});