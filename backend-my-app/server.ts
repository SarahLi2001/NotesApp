// Importing module
import express from 'express';
const mongoose = require('mongoose');  
const app = express();
const cors = require('cors');
const PORT:Number=4000;
const todoRoutes = express.Router();
let Todo = require('./todo.model');

app.use(cors());
  
app.use(express.json());

// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err: any, todos: any) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err: any, todo: any ) {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err: any, todo: any) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then((todo: any) => {
                res.json('Todo updated!');
            })
            .catch((err: any) => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/add').post(function(req, res) {
    console.log(req.body);
    let todo = new Todo(req.body);
    todo.save()
        .then((todo: any) => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch((err: any) => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/:id').delete(function(req, res) {

  

    Todo.findByIdAndRemove(req.params.id, function(err: any, todo: any) {
        if (!todo)
            res.status(404).send("data is not found");
        else
          console.log("Deleted");
          res.status(200).json('deleted');

    });
});

app.use('/todos', todoRoutes);

// Server setup
app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})