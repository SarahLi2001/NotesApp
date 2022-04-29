import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import X from '../x-symbol-svgrepo-com.svg'

import './Notes.css'


function Notes(){
    const history = useHistory();


    const Todo = (props: any)=> (
        <tr onClick={() => redirect(props)}>
            <td>{props.todo.todo_responsible}</td>
            <td>{props.todo.todo_description.substring(0,70)}</td>
            <td >{props.todo.todo_priority}</td>
            <td>
            <img className='delete-btn'  src={X} onClick={()=>{deleteNote(props.todo._id)}}/>
          </td>
    
        </tr>
    )
    
          //  <td>{() => {shortenLength(props.todo.todo_description)}}</td>
    
    
    function redirect(props: any) {
        history.push("/edit/"+props.todo._id)
    }     
    
    function deleteNote(e: any) {
        axios.delete('http://localhost:4000/todos/'+e)
                .then(response => window.location.reload());
    }
  
    
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
            <div className='test'>
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