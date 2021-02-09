const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tasks = new Schema({
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

module.exports = mongoose.model('Tasks', Tasks);