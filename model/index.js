var mongoose = require('mongoose');
mongoose.connect('mongodb://123.57.143.189/zhufengcrawl');
exports.Movie =  mongoose.model('Movie',new mongoose.Schema({
    name:String,
    url:String
}));

