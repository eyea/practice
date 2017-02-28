var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');
//它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './app/main.js'
    },
    //入口文件输出配置
    output: {
      // 入口文件最终要生成什么名字的文件、存放到哪里
        path: 'public/js/',
        filename: '[name].bundle.js'
    },
    module: {
      //加载器配置
      // "-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
      // 所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。
      loaders: [
        // test  一个匹配loaders所处理的文件的拓展名的正则表达式（必须
        // 感叹号的作用在于使同一文件能够使用不同类型的loader
          //.css 文件使用 style-loader 和 css-loader 来处理
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          //.js 文件使用 jsx-loader 来编译处理
          { test: /\.js$/, loader: 'jsx-loader?harmony' },
          //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
          { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
          //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
              // 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式
              //（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
      ]
    },
    devServer: {
      contentBase: "./public",//本地服务器所加载的页面所在的目录
      colors: true,//终端中输出结果为彩色
      historyApiFallback: true,//不跳转
      inline: true//实时刷新
    }
    // //其它解决方案配置
    // resolve: {
    //     //查找module的话从这里开始查找
    //     root: 'E:/github/flux-example/src', //绝对路径
    //     //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    //     extensions: ['', '.js', '.json', '.scss'],
    //     //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    //     alias: {
    //         AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
    //         ActionType : 'js/actions/ActionType.js',
    //         AppAction : 'js/actions/AppAction.js'
    //     }
    // }
};
