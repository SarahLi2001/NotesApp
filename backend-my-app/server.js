"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
var express_1 = __importDefault(require("express"));
var mongoose = require('mongoose');
var app = (0, express_1.default)();
var cors = require('cors');
var PORT = 4000;
var todoRoutes = express_1.default.Router();
var Todo = require('./todo.model');
app.use(cors());
app.use(express_1.default.json());
// Handling GET / Request
app.get('/', function (req, res) {
    res.send('Welcome to typescript backend!');
});
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
var connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});
todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todos);
        }
    });
});
todoRoutes.route('/:id').get(function (req, res) {
    var id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});
todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;
        todo.save().then(function (todo) {
            res.json('Todo updated!');
        })
            .catch(function (err) {
            res.status(400).send("Update not possible");
        });
    });
});
todoRoutes.route('/add').post(function (req, res) {
    console.log(req.body);
    var todo = new Todo(req.body);
    todo.save()
        .then(function (todo) {
        res.status(200).json({ 'todo': 'todo added successfully' });
    })
        .catch(function (err) {
        res.status(400).send('adding new todo failed');
    });
});
todoRoutes.route('/:id').delete(function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            console.log("Deleted");
        res.status(200).json('deleted');
    });
});
app.use('/todos', todoRoutes);
// Server setup
app.listen(PORT, function () {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
});
