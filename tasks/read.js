var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('crawler:read');
var iconv = require('iconv-lite');


module.exports =  function (url, callback) {
    var items = [];
    debug('读取电影列表');
    request({url:url,encoding:null},function(err,response,body){
        body = iconv.decode(body,'gbk');
        var $ = cheerio.load(body);
        $('.keyword .list-title').each(function(){
            var that = $(this);
            var item = {
                name:that.text().trim(),
                url:that.attr('href')
            }
            items.push(item);
            debug('读取电影 ',item);
        });
        callback(null,items);
        debug('读取电影列表完毕');
    });
}

