import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

type Params = {
    id: string;
};



function EditNotes()  {
    const [todo_description, set_todo_description] = useState('');
    const [todo_responsible, set_todo_responsible] = useState('');
    const [todo_priority, set_todo_priority] = useState(new Date().toLocaleString());
    const [todo_completed, set_todo_completed] = useState(false);

    const params = useParams<Params>();
    const history = useHistory();

    // constructor(props: {}) {
    //     super(props);

    //     this.onChangeNoteDescription = this.onChangeNoteDescription.bind(this);
    //     this.onChangeNoteTitle = this.onChangeNoteTitle.bind(this);
    //     this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    //     this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    //     this.onSubmit = this.onSubmit.bind(this);

    //     this.state = {
    //         todo_description: '',
    //         todo_responsible: '',
    //         todo_priority: '',
    //         todo_completed: false
    //     }
    // }

    async function fetchNotes() {
        try {
            let response = await axios.get('http://localhost:4000/todos/'+params.id);
            set_todo_description(response.data.todo_description);
            set_todo_responsible(response.data.todo_responsible);
            set_todo_priority(response.data.todo_priority);
            set_todo_completed(response.data.todo_completed);        
        } catch(error) {
            console.log(error);
        }
    }


    useEffect(() => {
       fetchNotes();
    }, []);

    // componentDidMount() {
    //     axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
    //         .then(response => {
    //             this.setState({
    //                 todo_description: response.data.todo_description,
    //                 todo_responsible: response.data.todo_responsible,
    //                 todo_priority: response.data.todo_priority,
    //                 todo_completed: response.data.todo_completed
    //             })   
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }



    function onSubmit(e: FormEvent<HTMLFormElement>) { //FormEventHandler<T>
        e.preventDefault();
        const obj = {
            todo_description: todo_description,
            todo_responsible: todo_responsible,
            todo_priority: todo_priority,
            todo_completed: todo_completed
        };

        async function deleteTodo() {
            let response = await axios.delete('http://localhost:4000/todos/'+params.id);
            console.log(response.data);
        }

        async function postTodo(){
            let response = await axios.post('http://localhost:4000/todos/update/'+params.id, obj);
            console.log(response.data);
        }

        if (todo_completed){

            deleteTodo();
        }
        else { 
            console.log(obj);
            postTodo();

        }
        
        history.push('/');
    }


    const onChangeNoteDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        set_todo_description(e.target.value);
    }

    const onChangeNoteTitle = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        console.log(e.currentTarget.value);
            set_todo_responsible(e.target.value);
    }

    function onChangeTodoPriority(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.checked)
            set_todo_priority('');
        else 
            set_todo_priority(new Date().toLocaleString());
    }


    const onChangeTodoCompleted = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            set_todo_completed(true);

        } else {
            set_todo_completed(false);
        }
    }

    return (
            <div>
                <h3 className="text-center" >Edit Note</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={todo_responsible
                                }
                                onChange={onChangeNoteTitle}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>

                        <textarea
                                className="form-control"
                                value={todo_description} 
                                onChange={onChangeNoteDescription} />
                    </div>                       
                        <div className="form-check">
                           <input  className="form-check-input" 
                                   id="dateCheckbox" 
                                   type="checkbox"
                                   name="dateCheckbox" 
                                   onChange={onChangeTodoPriority}
                                   checked={todo_priority ? true: false}
                                   value = {todo_priority}  
                                   />
                           <label className="form-check-label" htmlFor="completedCheckbox">
                           <b>Add Date</b>
                       </label>    
                       </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={onChangeTodoCompleted}
                                checked={todo_completed ? true: false}
                                value={todo_completed? "true": "false"}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Delete Note
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }


export default EditNotes;