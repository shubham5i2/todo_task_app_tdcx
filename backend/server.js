const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Tasks = require('./tasks.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/tasks').get(function(req, res) {
    Tasks.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

/*todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Tasks.findById(id, function(err, task) {
        res.json(task);
    });
});*/

todoRoutes.route('/tasks').post(function(req, res) {
    let tasks = new Tasks(req.body);
    console.log(req);
    tasks.save()
        .then(task => {
            res.status(200).json({'msg': 'task added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/task/:id').post(function(req, res) {
    Tasks.findById(req.params.id, function(err, task) {
        if (!task)
            res.status(404).send('data is not found');
        else
            task.task_id = req.body.task_id;
            task.task_name = req.body.task_name;
            task.isTaskCompleted = req.body.isTaskCompleted;

            task.save().then(task => {
                res.json('Task updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/task/:id').delete(function(req, res) {
    Tasks.findById(req.params.id, function(err, task) {
        if (!task)
            res.status(404).send('data is not found');
        else
            task.remove().then(task => {
                res.json('Task Deleted');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/taskDetails', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});