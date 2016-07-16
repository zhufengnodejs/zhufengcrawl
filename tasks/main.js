var read = require('./read');
var save = require('./save');
var async = require('async');
process.env.DEBUG = 'crawler:*';
var debug = require('debug')('crawler:main');
debug('开始计划任务');
var movies = [];
async.series([
    function(done){
        read('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function(err,items){
            movies = items;
            done();
        });
    },
    function(done){
        save(movies,done);
    }
],function(err,result){
    debug('结束计划任务');
    process.exit(0);
})


