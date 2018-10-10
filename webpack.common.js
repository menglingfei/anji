var path = require("path"),
		glob = require("glob"),
		webpack = require("webpack"),
        CleanWebpackPlugin = require("clean-webpack-plugin"),
		ExtractTextPlugin = require("extract-text-webpack-plugin"),
		HtmlWebpackPlugin = require("html-webpack-plugin"),
		CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
		rootPath = path.resolve(__dirname);

var entries = getEntry('src/js/page/**/*.js', 'src/js/page/')

var chunks = Object.keys(entries)

var config = {
      entry: entries,
      output: {
          path: path.join(__dirname, 'public'),
          //publicPath: '/public/',
          filename: 'js/[name].[chunkhash:8].js',
          chunkFilename: 'js/[name].chunk.js?[chunkhash:8]'
      },
      module: {
          loaders: [ // 加载器
              {
                  test: /\.css$/,
                  loader: ExtractTextPlugin.extract({fallback:'style-loader', use:'css-loader'})
              }, {
                  test: /\.less$/,
                  loader: ExtractTextPlugin.extract('css-loader!less-loader')
              }, {
                  test: /\.html$/,
                  loader: 'html-loader?-minimize' // 避免压缩html,https://github.com/webpack/html-loader/issues/50
              }, {
                  test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                  loader: 'file-loader?name=fonts/[name].[ext]'
              }, {
                  test: /\.(png|jpe?g|gif)$/,
                  loader: 'url-loader?limit=8192&name=imgs/[name]-[hash:8].[ext]'
              }, {
                  test: /\.styl$/,
                  loader: ExtractTextPlugin.extract({fallback:'style-loader', use:'css-loader!stylus-loader'})
              },{
                  test: /\.js$/,
                  loader: 'babel-loader?presets=es2015'
              }
          ]
      },
      plugins: [
          /*new webpack.ProvidePlugin({ // 加载jq
            $: 'jquery'
          }),*/
          new CommonsChunkPlugin({
              name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
              chunks: chunks,
              minChunks: 3 // 提取所有entry共同依赖的模块
          }),
          //清除上次打包产生的垃圾
          new CleanWebpackPlugin([
              'public/js/*.js',
              'public/css/*.css'
          ]),
          new ExtractTextPlugin('css/[name].[contenthash:8].css') // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
      ],

      externals:{
          //"zepto"  : "window.zepto"
      },

      resolve: {
          extensions: ['.js'],
          alias: {
              'jquery'    : rootPath + '/src/js/lib/jquery.min.js',
              'http'     : rootPath + '/src/js/common/http.js',
              'common'   : rootPath + '/src/js/common/com.js',
              'store'    : rootPath + '/src/js/lib/store.js'
          }
      },
      devServer: {
          port: '8080',
          proxy: {
              '/api/*': {
                  target: 'http://dev.yunzhizhan.cn',
                  changeOrigin: true
              }
          }
      }
};
var pages = Object.keys(getEntry('src/**/*.html', 'src/'));
console.log(`pagesLength:${pages.length}`);
pages.forEach(function (pathname) {
  var conf = {
    filename: '../public/' + pathname + '.html', // 生成的html存放路径，相对于path
    template: 'src/' + pathname + '.html', // html模板路径
    inject: false // js插入的位置，true/'head'/'body'/false
    /*
     * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
     * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
     * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
     * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
     */
    // minify: { //压缩HTML文件
    //  removeComments: true, //移除HTML中的注释
    //  collapseWhitespace: false //删除空白符与换行符
    // }
  }
  if (pathname in config.entry) {
    //conf.favicon = rootPath+'/src/imgs/favicon.ico'
    conf.inject = 'body'
    conf.chunks = ['vendors', pathname]
    //conf.hash = true
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = config

function getEntry (globPath, pathDir) {
  var files = glob.sync(globPath)
  var entries = {}, entry, dirname, basename, pathname, extname

  for (var i = 0; i < files.length; i++) {
    entry = files[i]
    dirname = path.dirname(entry)
    extname = path.extname(entry) 
    basename = path.basename(entry, extname)
    pathname = path.normalize(path.join(dirname, basename))
    pathDir = path.normalize(pathDir)
    if (pathname.startsWith(pathDir)) {
      pathname = pathname.substring(pathDir.length)
    }
    entries[pathname] = ['./' + entry]
  }
  return entries
}