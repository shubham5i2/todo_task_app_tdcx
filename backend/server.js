
const {LocalStorage} = require('node-localstorage');
const express = require('express');
//let session = require('express-session');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let localStorage = new LocalStorage('./scratch'); 
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

var currentId = null;

todoRoutes.route('/login').post(async function(req,res){
    let userDetails = await Users.findOne({id:req.body.id});
    if(userDetails){
        if(userDetails.name === req.body.name) {
            currentId = req.body.id;
            return res.status(200).send({userInfo:userDetails});
        }
        else if(req.body.sessionExist) {
            currentId = req.body.id;
            return res.status(200).send({userInfo:userDetails});
        }
        else {
            return res.status(400).send({msg:'Id exists! Please provide name associated with id to login'});
        }
    }
    else {
        let user = new Users(req.body);
        user.save()
            .then(task => {
                //req.session.userId = req.body.id;
                currentId = req.body.id;
                res.status(200).send({msg:'New User Created',userInfo:task})
            })
            .catch(err => {
                res.status(400).send('adding new User failed');
            });
    }
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
    Users.findOne({id:currentId},function(err,details){
        if(err){
            console.log('error occured');
        }
        else {
            res.send({status:200,data:details});
        }
    })
});

//add task route
todoRoutes.route('/tasks').post(async function(req,res){
    //console.log(req.session);
    //let user = new Users(req.body);
    let userDetails = await Users.findOne({id:req.body.id})
    //console.log(userDetails);
    if(userDetails){
        let taskDetails = userDetails.tasks;
        taskDetails.push({task_id:req.body.task_id,task_name:req.body.task_name,isTaskCompleted:req.body.isTaskCompleted});
        userDetails.tasks = taskDetails;
        Users.updateOne({id:req.body.id},userDetails).then(details=>{
            res.send({status:200,data:details});
        });
    }
    
});

//update task routes
todoRoutes.route('/tasks/:id').put(async function(req,res){
    currentId = req.body.loggedId;
    let userDetails = await Users.findOne({id:req.body.loggedId});
    let taskExists = [];//userDetails.tasks.filter(item=>item._id==req.params.id);
    if(userDetails && userDetails.tasks && userDetails.tasks.length>0){
        userDetails.tasks.map((item)=>{
            if(item._id == req.params.id){
                item.isTaskCompleted = !item.isTaskCompleted;
                taskExists.push(item);
            }
            else {
                taskExists.push(item);
            }
        })
        userDetails.tasks = taskExists;
        Users.updateOne({id:req.body.loggedId},userDetails).then(details=>{
            res.send({status:200,data:details});
        });
    }
    else {
        res.send({status:200,msg:'Updated route'});
    }
    
});

//delete task routes
todoRoutes.route('/tasks/:id').delete(async function(req,res){
    currentId = req.body.loggedId;
    let userDetails = await Users.findOne({id:req.body.loggedId});
    let taskExists = [];//userDetails.tasks.filter(item=>item._id==req.params.id);
    if(userDetails && userDetails.tasks && userDetails.tasks.length>0){
        userDetails.tasks.map((item)=>{
            if(item._id != req.params.id){
                taskExists.push(item);
            }
        })
        userDetails.tasks = taskExists;
        Users.updateOne({id:req.body.loggedId},userDetails).then(details=>{
            res.send({status:200,data:details});
        });
    }
    else {
        res.send({status:200,msg:'Updated route'});
    }
    
});

todoRoutes.route('/logout').post(async function(req,res){
    let currentSession = localStorage.getItem('current-session');
    if(currentSession === req.body.id){
        localStorage.setItem('current-session',null);
    }
});

app.use('/',todoRoutes);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
