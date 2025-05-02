import React from "react"
import TasksList from "./components/TasksList.jsx"
import MistralSchedule from "./components/MistralSchedule.jsx"

export default function Home() {
    const [tasks, setTasks] = React.useState(
        ["Python", "Data structures and algorithms", "React", "Java", "AWS"]
    )

    const [schedule, setSchedule] = React.useState("")

    async function getSchedule() {
        const res = await fetch('http://localhost:5000/api/mistral-schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks })
        });
    
        const data = await res.json();
        setSchedule(data.schedule);
    }

    function addTask(formData) {
        const newTask = formData.get("task")
        setTasks(prevTasks => [...prevTasks, newTask])
    }

    function deleteTask(indexToDelete) {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== indexToDelete));
    }

    return (
        <main>
            <form action={addTask} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. Algorithms"
                    aria-label="Add Task"
                    name="task"
                />
                <button>Add Study Block</button>
            </form>

            {tasks.length > 0 &&
                <TasksList
                    tasks={tasks}
                    getSchedule={getSchedule}
                    deleteTask={deleteTask}
                />
            }

            {schedule && <MistralSchedule schedule={schedule} />}
        </main>
    )
}