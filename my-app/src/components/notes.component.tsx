import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = (props: any)=> (
    <tr>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_description.substring(0,70)}</td>
        <td >{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td>
        <button value= {props.todo._id} onClick={()=>{handleClick(props.todo._id)}}>DELETE
      </button>        
      </td>

    </tr>
)

      //  <td>{() => {shortenLength(props.todo.todo_description)}}</td>



function handleClick(e: any) {
    axios.delete('http://localhost:4000/todos/'+e)
            .then(response => window.location.reload());
}

function Notes(){

  
    
    const [todos, setTodos] = useState([]);

   

   
    useEffect(() => {

        async function fetchNotes() {
            try {
                let response = await axios.get('http://localhost:4000/todos/');
                setTodos(response.data);
            } catch(error) {
                console.log(error);
            }
        }

        fetchNotes();
        // axios.get('http://localhost:4000/todos/')
        //     .then(response => {
        //        setTodos(response.data);
        //     })
        //     .catch(function (error){
        //         console.log(error);
        //     })
    }, []);
   
    function todoList() {
        return todos.map(function(currentTodo: any, i: any){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

        return (
            <div>
                <h3>Notes</h3>
                {/* <button onClick={handleClick}>Delete Selected
      </button>   */}
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { todoList() }
                    </tbody>
                </table>
            </div>
        )
    
}

export default Notes;