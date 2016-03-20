var express = require("express");
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var _ = require("underscore");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/todo-mean');
var Schema = mongoose.Schema;
// create a schema
var todoSchema = new Schema({
    title: String,
    description: String,
    status: Boolean,
    addedOn: Date
});

// the schema is useless so far
// we need to create a model using it
var todos = mongoose.model('todo', todoSchema, "todos");

// get all todos
app.get('/todos', function (req, res) {
    todos.find(function (err, todos) {
        if (err) {
            return res.send(err);
        }
        res.json(todos);
    });

});

// get todo for id
app.get('/todos/:id', function (req, res) {
    todos.findOne({"_id": req.params.id}, function (err, todos) {
        res.json(todos);
    });

});

// add new todo
app.post('/todos', function(req, res) {
    var todo = new todos(req.body);
    todo.save(function(err) {
        if (err) {
            return res.send(err);
        }
        res.send({ message: 'Todo Added' });
    });
});

// update todo
app.put('/todos/:id', function(req,res){
    todos.findOne({ _id: req.params.id }, function(err, todo) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            todo[prop] = req.body[prop];
        }

        // save the todo
        todo.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Todo updated' });
        });
    });
});

// delete todo for id
app.route('/todos/:id').delete(function(req, res) {
    todos.remove({
        _id: req.params.id
    }, function(err, todo) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Todo deleted' });
    });
});

// delete todo for id
app.route('/todos').delete(function(req, res) {
    todos.remove(function(err, todo) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Todos deleted' });
    });
});
app.route('/clearCompleted').delete(function(req, res) {
    todos.remove({
        status : true
    }, function(err, todo) {
        console.log(todo) ;
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Completed todos deleted' });
    });
});
app.listen(3000);