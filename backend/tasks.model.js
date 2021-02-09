const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Tasks = new Schema({
    task_id: {
        type: Number
    },
    task_name: {
        type: String
    },
    isTaskCompleted: {
        type: Boolean
    },
});

var users = new Schema({
    id: Number,
    name: String,
    tasks: [Tasks]
});

const Users = mongoose.model('users',users);
module.exports=Users;

//module.exports = mongoose.model('users',users);
//module.exports = mongoose.model('Tasks', Tasks);