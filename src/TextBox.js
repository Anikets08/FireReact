import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import TodoTab from './ToDoTab';

function TextBox({ todotext, setTodotext }) {
    const db = firebase.firestore();
    const [todos, setTodos] = useState([]);

    function addTodo() {
        db.collection("todos").add(
            {
                inprogress: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                todo: todotext,
            }
        )
    }


    function getData() {
        db.collection('todos').orderBy("timestamp", "desc").onSnapshot(function (querySnapshot) {
            setTodos(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    todoo: doc.data().todo,
                    inProgress: doc.data().inprogress,
                }))
            );
        });
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className="text-box">
                    <label htmlFor="add-task">To Do</label>
                    <input
                        onChange={(e) => setTodotext(e.target.value)}
                        type="text"
                        name="add-task"
                        id="add-task" />
                    <button onClick={addTodo} type="submit">Add</button>

                </div>

                {
                    todos.map((todo) => (
                        <TodoTab todo={todo.todoo} inprogress={todo.inProgress} id={todo.id} />
                    ))
                }


            </div>

        </div>

    );
}

export default TextBox;