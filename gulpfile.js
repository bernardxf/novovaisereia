const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const copy = require('gulp-contrib-copy');
const imagemin = require('gulp-imagemin');
const uglyfly = require('gulp-uglyfly');
const watch = require('gulp-watch');

let destino = 'site/';

gulp.task('pug', function () {
	return gulp.src('dev/pug/*.pug')
		.pipe(pug())
		.pipe(gulp.dest(destino));
});

gulp.task('stylus', function () {
	return gulp.src('dev/stylus/main.styl')
		.pipe(stylus())
		.pipe(gulp.dest(destino+'style/'));
});

gulp.task('stylusBuild', function () {
	return gulp.src('dev/stylus/main.styl')
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest(destino+'style/'));
});

gulp.task('copyFonts', function() {
	return gulp.src('dev/fonts/**')
		.pipe(copy())
		.pipe(gulp.dest(destino+'fonts/'));
});

gulp.task('copyJS', function() {
	return gulp.src('dev/js/**/*')
		.pipe(copy())
		.pipe(gulp.dest(destino+'js/'));
});

gulp.task('copyCSS', function() {
	return gulp.src('dev/stylus/*.css')
		.pipe(copy())
		.pipe(gulp.dest(destino+'style/'));
});

gulp.task('uglyfly', function() {
	return gulp.src('dev/js/**/*')
		.pipe(uglyfly())
		.pipe(gulp.dest(destino+'js/'));
});

gulp.task('copyPHP', function() {
	return gulp.src('dev/php/**/*')
		.pipe(copy())
		.pipe(gulp.dest(destino+'php/'));
});

gulp.task('imagemin', function(){
    gulp.src('dev/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(destino+'images/'))
});

gulp.task('watch', function() {
	gulp.watch('dev/stylus/**/*.styl', ['stylus']);
	gulp.watch('dev/pug/*.pug', ['pug']);
	gulp.watch('dev/js/*.js', ['copyJS']);
	gulp.watch('dev/php/*.php', ['copyPHP']);
	gulp.watch('dev/fonts/**', ['copyFonts']);
	gulp.watch('dev/images/**', ['imagemin']);
});

gulp.task('images',['imagemin'], function() {});
gulp.task('site',['pug','stylus','copyFonts','copyJS','copyPHP','copyCSS','watch'], function() {});
gulp.task('build',['pug','stylusBuild','copyFonts','copyCSS','uglyfly','copyPHP'], function() {});