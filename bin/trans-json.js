#!/usr/bin/env node

var url = require('url');
var forEach = require('lodash.foreach');
var mapValues =  require('lodash.mapvalues');

var webpackStats = require('../webpack-stats.json');
var fs = require('fs');

var assetTypes =
  Object.keys(webpackStats)
  .filter(function(k){ return k.match(/javascript|styles|images/); });

function stripUrlOrigin (assetUrl) {
  return url.parse(assetUrl).pathname;
}

function translateAssetPaths (assetType){
  webpackStats[assetType] = mapValues(webpackStats[assetType], stripUrlOrigin);
}

assetTypes.forEach(translateAssetPaths);

fs.writeFileSync('./webpack-stats-fixed.json', JSON.stringify(webpackStats, null, 2));

