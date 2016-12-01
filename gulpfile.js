var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'); //nodejs command to get handle to gulp methods and properties

var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'production';

if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/tagline.coffee']
jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];
jsonSources = [outputDir + 'js/*.json']
htmlSources = [outputDir + '*.html'];

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
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({			// set up preferences here instead of a config file
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(connect.reload())
})

gulp.task('json', function() {
	gulp.src(jsonSources)
		.pipe(connect.reload())
})
gulp.task('default', ['json', 'html', 'coffee', 'js', 'compass', 'connect', 'watch']);

