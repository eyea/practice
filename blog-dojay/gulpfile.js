var gulp = require('gulp');

var sass         = require('gulp-sass'),
	autoPrefixer = require('gulp-autoprefixer'),
	minifyCss    = require('gulp-minify-css'),
	jshint       = require('gulp-jshint'),
	uglify       = require('gulp-uglify'),
	imageMin 	 = require('gulp-imagemin'),
	rename 		 = require('gulp-rename'),
	concat 		 = require('gulp-concat'),
	livereload   = require('gulp-livereload'),
	connect 	 = require('gulp-connect'),
	named 		 = require('vinyl-named'),
	webpack 	 = require('gulp-webpack');

// 设置路径
var path = {
	src   : 'src/',
	css   : 'src/css/',
	js    : 'src/js/',
	imgs  : 'src/imgs',
	build : 'build/'
};

// 操作css
gulp.task('styles', function() {
	return  gulp.src(path.css + '*.scss')
				.pipe(sass())
				.pipe(autoPrefixer('last 2 version', 'safari 5', 'ie10', 'ios 6', 'android 4'))
				.pipe(rename({ suffix: '.min'}))
				.pipe(minifyCss())
				.pipe(gulp.dest(path.build + 'css'));
});

// base js
gulp.task('basejs', function() {
	return  gulp.src([
					'node_modules/jquery/dist/jquery.min.js',
					'src/libs/template.min.js'
				])
				.pipe(concat('base.js'))
				.pipe(rename({ suffix: '.min'}))
				.pipe(gulp.dest(path.build + 'js'));
});

// 功能js
gulp.task('scripts', function() {
	return  gulp.src(path.js + '*.js')
				.pipe(jshint())
				.pipe(rename({ suffix : '.min' }))
				.pipe(gulp.dest(path.build + 'js'));
});

// 操作imgs
gulp.task('images', function() {
	return  gulp.src(path.imgs + '*.*')
				.pipe(gulp.dest(path.build + 'imgs'));
});

// 生成发布版本
gulp.task('default', function() {
	gulp.start('basejs', 'scripts', 'styles', 'images');
});
