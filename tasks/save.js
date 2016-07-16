var async = require('async');
var Movie = require('../model').Movie;
var debug = require('debug')('crawler:save');

module.exports = function(items,callback){
    async.series([
       function(callback){
           debug('清空电影列表');
           Movie.remove({},callback);
       },
       function(callback){
           debug('保存电影列表');
           async.forEach(items, function (item, next) {
               debug('保存电影 ',item);
               Movie.create(item,next);
           }, callback);
       }
    ],function(err,result){
        debug('保存电影完毕');
        callback();
    })
}