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
	return 	gulp.src(path.js + '*.js')
				.pipe(named())
				.pipe(webpack({
					output: {
						filename: '[name].js'
					},
					module: {
						// 加载器配置
						loaders: [
							// .css文件实用style-loader和css-loader来处理
							{test: /\.css$/, loader: 'style-loader!css-loader'},
							// .js文件使用jsx-loader来编译处理
							{test: /\.js$/, loader: 'jsx-loader?harmony'},
							// .scss文件使用style-loader,css-loader和sass-loader来编译处理
							{test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
							// 图片文件使用url-loader来处理，小于8kb的直接转为base64
							{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
							// html
							{test: /\.(html|tpl)$/,loader: 'html-loader'}
						]
					},
					// 其他解决方案配置
					resolve: {
						// 自动扩展文件名后缀，reuiqre的时候可以省略文件名
						extensions: ['', '.js', '.scss'],
					}
			   	}))
		   	   	.pipe(jshint()) 
		   	   	.pipe(rename({ suffix: '.min'}))
		   	   	// .pipe(uglify())
		   	   	.pipe(gulp.dest(path.build + '/js'));
});

// 操作imgs
gulp.task('images', function() {
	return  gulp.src(path.imgs + '*.*')
				.pipe(gulp.dest(path.build + 'imgs'));
});

// 使用connect启动一个web服务器
gulp.task('server', function() {
	connect.server({
		livereload : true,
		open:true
	});
});
// reload server
gulp.task('reload', ['scripts', 'styles'], function() {
	gulp.src(path.src + '**/*.*')
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function() {
	// 监听生产环境目录变化
	gulp.watch(path.src + '**/*.*', ['scripts', 'styles']);
});

// 生成发布版本
gulp.task('default', function() {
	gulp.start('basejs', 'scripts', 'styles', 'images', 'watch');
});
