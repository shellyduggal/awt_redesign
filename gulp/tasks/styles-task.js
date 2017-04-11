var gulp 			= require('gulp'),
	autoprefixer 	= require('autoprefixer'),
	cssVars 		= require('postcss-simple-vars'),
	nested 			= require('postcss-nested'),
	cssImport 		= require('postcss-import'),
	postCSS 		= require('gulp-postcss'),
	hexrgba 		= require('postcss-hexrgba'),
	mixins 			= require('postcss-mixins');

gulp.task('styles', function() {
	return gulp.src("./app/assets/stylesheets/styles.css")
		.pipe(postCSS([cssImport, mixins, nested, cssVars, hexrgba, autoprefixer]))
		.on('error', function(err){
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'));
});