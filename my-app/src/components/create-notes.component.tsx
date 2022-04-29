import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';


function CreateNote() {


    const [todo_description, set_todo_description] = useState('');
    const [todo_responsible, set_todo_responsible] = useState('');
    const [todo_priority, set_todo_priority] = useState(new Date().toLocaleString());
    const [todo_completed, set_todo_completed] = useState(false);


    // constructor(props: any) {
    //     super(props);

    //     this.onChangeNoteDescription = this.onChangeNoteDescription.bind(this);
    //     this.onChangeNoteTitle = this.onChangeNoteTitle.bind(this);
    //     this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    //     this.onSubmit = this.onSubmit.bind(this);

    //     this.state = {
    //         todo_description: '',
    //         todo_responsible: '',
    //         todo_priority: new Date().toLocaleString(),
    //         todo_completed: false
    //     }
    // }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${todo_description}`);
        console.log(`Todo Responsible: ${todo_responsible}`);
        console.log(`Todo Priority: ${todo_priority}`);
     
        const newTodo = {
            todo_description: todo_description,
            todo_responsible: todo_responsible,
            todo_priority: todo_priority,
            todo_completed: todo_completed
        };

        async function postOnSubmit() {
            let response = await axios.post('http://localhost:4000/todos/add', newTodo);
            console.log(response.data);
        }
        
        postOnSubmit();
        // axios.post('http://localhost:4000/todos/add', newTodo)
        //     .then(res => console.log(res.data));

            set_todo_description('');
            set_todo_responsible('');
            set_todo_priority(new Date().toLocaleString());
            set_todo_completed(false);

          
    }

    function onChangeNoteDescription(e: ChangeEvent<HTMLTextAreaElement>) {
            set_todo_description(e.target.value);
    }

    function onChangeNoteTitle(e: ChangeEvent<HTMLInputElement>) {
            set_todo_responsible(e.target.value);
    }

    function onChangeTodoPriority(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.checked)
            set_todo_priority('');
        else 
            set_todo_priority(new Date().toLocaleString());
    }

        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Note</h3>
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
                    <div className="form-group">
                        
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
                        {/* <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div> */}
                    </div><br/>

                    <div className="form-group">
                        <input type="submit" value="Create Note" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    
    
}

export default CreateNote;