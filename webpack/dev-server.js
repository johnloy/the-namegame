var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var config = require('./dev.config')

var host = process.env.HOST || 'localhost'

var port = parseInt(process.env.PORT, 10) + 1 || 3001

var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
}

var compiler = webpack(config, function (err, stats) {
  var json = stats.toJson()
  if (json.errors.length) {
    console.error(json.errors[0])
  }
  if (err) {}
})

var webpackDevServer = new WebpackDevServer(compiler, serverOptions)

webpackDevServer.listen(port, host, function () {
  console.info('==> 🚧  Webpack development server listening on %s:%s', host, port)
})
