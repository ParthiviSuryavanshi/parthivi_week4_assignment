const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    status:String,
    date:{
        type:Date,
        required:true
    },
})
const Taskdb = mongoose.model('taskdb',schema);

module.exports = Taskdb;