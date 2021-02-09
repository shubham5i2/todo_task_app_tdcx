const express = require('express');
//let session = require('express-session');
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
    let user = new Users(req.body);
    user.save()
        .then(task => {
            //req.session.userId = req.body.id;
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
    //let user = new Users(req.body);
    Users.findOne({id:req.body.id||1},function(err,details){
        if(err){
            console.log('error occured');
        }
        else {
            res.json(details.tasks);
        }
    })
});

//add task route
todoRoutes.route('/tasks').post(async function(req,res){
    console.log(req.session);
    //let user = new Users(req.body);
    let userDetails = await Users.findOne({id:req.body.id})
    console.log(userDetails);
    if(userDetails){
        let taskDetails = userDetails.tasks;
        taskDetails.push({task_id:req.body.task_id,task_name:req.body.task_name,isTaskCompleted:req.body.isTaskCompleted});
        userDetails.tasks = taskDetails;
        Users.updateOne({id:req.body.id},userDetails).then(details=>{
            res.send(details);
        });
    }
    
});

app.use('/',todoRoutes);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});