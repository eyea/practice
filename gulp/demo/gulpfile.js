// 引入 gulp
var gulp = require('gulp');

// 引入插件
var sass         = require('gulp-sass'), //sass语法
    autoprefixer = require('gulp-autoprefixer'), // 自动添加css前缀
    minifycss    = require('gulp-minify-css'), // 压缩css
    jshint       = require('gulp-jshint'), // js代码中错误和潜在问题的工具
    uglify       = require('gulp-uglify'), // js代码优化工具，可以解析，压缩和美化代码
    imagemin     = require('gulp-imagemin'), // 压缩图片
    rename       = require('gulp-rename'), // 改变文件名
    concat       = require('gulp-concat'), // 链接合并文件
    cache        = require('gulp-cache'), // 图片缓存，只有图片替换了才压缩
    livereload   = require('gulp-livereload'), // 自动刷新页面
    connect      = require('gulp-connect'), //本地启动一个web server
    named        = require('vinyl-named'),
    webpack      = require('gulp-webpack'),
    rev 		 = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');


// 设置路径
var path = {
	src   : 'src/',
	css   : 'src/css/',
	js    : 'src/js/',
	img   : 'src/images/',
	build : 'build',
	// gulp.dest的输出路径build
	devBuild : 'devBuild'
	// devBuild 调试时候用的
};

// 操作css
// 找到这个操作css的task
gulp.task('styles',function() {
	return gulp.src(path.css + '*.scss')
			   .pipe(sass())
			   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie10', 'ios 6', 'android 4'))
			   .pipe(rename({ suffix: '.min' }))
			   .pipe(minifycss())
			   .pipe(gulp.dest(path.build + '/css'))
			   .pipe(rev.manifest())
			   .pipe(gulp.dest(path.build+'/css/ver'));
});

// 操作js
gulp.task('basejs', function() {
	return gulp.src([	
					'src/js/lib/template.min.js',
					'node_modules/jquery/dist/jquery.min.js',
					'src/js/lib/underscore.min.js',
					'src/js/lib/pinchZoom.min.js'
				])
		   	   .pipe(jshint())
		   	   .pipe(concat('base.js'))
		   	   .pipe(rename({ suffix: '.min'}))
		   	   .pipe(gulp.dest(path.build + '/js'));
});

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
						// alias: 
					}
			   	}))
		   	   	.pipe(jshint()) 
		   	   	.pipe(rename({ suffix: '.min'}))
		   	   	.pipe(uglify())
		   	   	.pipe(gulp.dest(path.build + '/js'));
});
// js调试模式
gulp.task('debugJs', function() {
	return gulp.src(path.js + '*.js')
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
						// alias: 
					}
			   	}))
		   	   	.pipe(jshint())
		   	   	.pipe(rename({ suffix: '.min'}))
		   	   	.pipe(gulp.dest(path.build + '/js'))
		   	   	.pipe(rev.manifest())
		   	   	.pipe(gulp.dest(path.build + '/js/ver'));
});

// 压缩images
gulp.task('images', function() {
	return gulp.src(path.img + '*.*')
			   .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
			   .pipe(gulp.dest(path.build + '/images'));
});


// 移动模版
gulp.task('tpl', function() {
	return gulp.src(path.src+'*.html')
			   .pipe(gulp.dest(path.build));
});


// 生成发布版本
gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'basejs', 'images', 'tpl');
});

// js调试
gulp.task('debug', function() {
	gulp.start('styles', 'debugJs', 'basejs', 'images', 'tpl');
});


// task这个api用来创建任务，在命令行下可以输入gulp XXX来执行xxx的任务
// watch这个api用来监听任务
// src这个api设置需要处理的文件的路径，可以是多个文件以数组的形式［main.scss，verder.css］，也可以是正则表达式
// dest这个api设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本










