#!/usr/bin/env node

var cloneDeep = require('lodash.clonedeep');
var url = require('url');
var forEach = require('lodash.foreach');
var mapValues =  require('lodash.mapvalues');
var fs = require('fs-extra');

var webpackStatsProd = cloneDeep(require('../webpack-stats.json'));

var assetTypes =
  Object.keys(webpackStatsProd)
  .filter(function(k){ return k.match(/javascript|styles|images/); });

function stripUrlOrigin (assetUrl) {
  return url.parse(assetUrl).pathname;
}

function translateAssetPaths (assetType){
  webpackStatsProd[assetType] = mapValues(webpackStatsProd[assetType], stripUrlOrigin);
}

assetTypes.forEach(translateAssetPaths);

fs.writeFileSync('./webpack-stats.json', JSON.stringify(webpackStatsProd, null, 2));

