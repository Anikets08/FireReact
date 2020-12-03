import React from 'react';
import firebase from 'firebase';

function TodoTab({ todo, inprogress, id }) {
    const db = firebase.firestore();

    function deleteTodo() {
        db.collection('todos').doc(id).delete();
        console.log(id);
    }


    function done() {
        db.collection('todos').doc(id).update({
            inprogress: !inprogress,
        });
    }


    return (
        <div className="ToDoTab">
            <div className="onestContainer">
                <h1>{todo}</h1>
                <button onClick={done} type="submit">Done</button>
                <button onClick={deleteTodo} type="submit">Delete</button>
            </div>
            {inprogress ? (<p>Inprogress</p>) : (<p>Completed</p>)}


        </div>
    );
}

export default TodoTab;