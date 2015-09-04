#!/usr/bin/env node

// enables ES6 support
require('babel/register')({
  stage: 0,
  plugins: ['typecheck']
})

var path = require('path')
var rootDir = path.resolve(__dirname, '..')
var React = require('react')
var Html = require('../src/components/html')

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = true
global.__SERVER__ = false
global.__DEVELOPMENT__ = false

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
var webpackIsomorphicTools;
webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
  .development(false)
  .server(rootDir, function () { })

var html = '<!doctype html>\n' + React.renderToStaticMarkup(
  React.createElement(Html, { assets: webpackIsomorphicTools.assets(), component: React.createElement('div') })
);

console.log(html);
