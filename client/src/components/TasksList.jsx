import React from 'react'
import DeleteButton from "./DeleteButton";

export default function TasksList(props) {
    const tasksListItems = props.tasks.map((task, index) => (
        <li key={index}>
            {task}
            <DeleteButton onClick={() => props.deleteTask(index)} label={`Delete ${task}`} />
        </li>
    ))

    return (
        <section>
            <h2>Study blocks:</h2>
            <ul className="tasks-list" aria-live="polite">{tasksListItems}</ul>
            {props.tasks.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Are you ready for today?</h3>
                    <p>Generate a schedule based on your study blocks</p>
                </div>
                <button onClick={props.getSchedule}>Get a schedule</button>
            </div>}
        </section>
    )
}