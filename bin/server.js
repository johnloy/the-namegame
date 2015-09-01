#!/usr/bin/env node

// enables ES6 support
require('babel/register')({
  stage: 0,
  plugins: ['typecheck']
})

var path = require('path')
var rootDir = path.resolve(__dirname, '..')

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = true  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

// if (__DEVELOPMENT__) {
//   if (!require('piping')({
//     hook: true,
//     ignore: /(\/\.|~$|\.json|\.scss$)/i
//   })) { }
// }

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function () {
    require('../src/server')
  })
