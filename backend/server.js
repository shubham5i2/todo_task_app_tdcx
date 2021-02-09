const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const Users = require('./tasks.model');

//login route
todoRoutes.route('/login').post(function(req,res){
    console.log(req.body);
    let user = new Users(req.body);
    user.save()
        .then(task => {
            res.status(200).json({'msg': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/users').get(function(req,res){
    Users.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

//dashboard data route added
todoRoutes.route('/dashboard').get(function(req,res){
    console.log(req.body);
    //let user = new Users(req.body);
    Users.findOne({id:req.body.id},function(err,details){
        if(err){
            console.log('error occured');
        }
        else {
            res.json(details);
        }
    })
});

//tasks route added
todoRoutes.route('/tasks').get(function(req,res){
    console.log(req.body);
    //let user = new Users(req.body);
    Users.findOne({id:req.body.id},function(err,details){
        if(err){
            console.log('error occured');
        }
        else {
            res.json(details.tasks);
        }
    })
});

app.use('/',todoRoutes);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});