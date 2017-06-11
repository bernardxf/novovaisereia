const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const copy = require('gulp-contrib-copy');
const imagemin = require('gulp-imagemin');
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

gulp.task('imagemin', function(){
    gulp.src('dev/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(destino+'images/'))
});

gulp.task('watch', function() {
	gulp.watch('dev/stylus/**/*.styl', ['stylus']);
	gulp.watch('dev/pug/*.pug', ['pug']);
	gulp.watch('dev/js/*.js', ['copyJS']);
	gulp.watch('dev/fonts/**', ['copyFonts']);
	gulp.watch('dev/images/**', ['imagemin']);
});

gulp.task('images',['imagemin'], function() {});
gulp.task('site',['pug','stylus', 'copyFonts','copyJS','watch'], function() {});