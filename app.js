var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.set('views', 'views');
var Movie = require('./model').Movie;
app.get('/', function (req, res) {
    Movie.find({}, function (err, movies) {
        res.render('index', {
            movies: movies
        });
    });
});
app.listen(9090);

var spawn = require('child_process').spawn;
var cronJob = require('cron').CronJob;
var path = require('path');
var job = new cronJob('* * * * * ',function(){
    var update = spawn(process.execPath,[path.join(__dirname,'tasks/main.js')]);
    update.stdout.pipe(process.stdout);
    update.stderr.pipe(process.stderr);
    update.on('close',function(code){
        console.log(code);
    });
    update.on('error',function(code){
        console.log(code);
    });
});
job.start();