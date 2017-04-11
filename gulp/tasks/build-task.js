var	gulp		= require('gulp'),
	imagemin 	= require('gulp-imagemin'),
	del 		= require('del'),
	usemin		= require('gulp-usemin'),
	rev			= require('gulp-rev'),
	cssnano 	= require('gulp-cssnano'),
	uglify 		= require('gulp-uglify'),
	browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('deleteDistFolder', ['icons'], function() {
	return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'./app/index.html',
		'./app/assets/images/**',
		'!./app/assets/stylesheets/',
		'!./app/assets/stylesheets/**',
		'!./app/assets/scripts/**',
		'!./app/temp/',
		'!./app/temp/**'
	]

	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./dist'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start('usemin');
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp.src('./app/assets/images/**/*')
		.pipe(imagemin({
			progressive: true, //optimize jpg images
			interlaced: true, //optimize gif images
			multipass: true //optimize svg images
		}))
		.pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src('./app/index.html')
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger', 'previewDist']);




