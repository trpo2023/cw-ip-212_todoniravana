// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Select elements
const taskForm = document.querySelector("form");
const taskList = document.getElementById("taskList");
const completedTasksList = document.getElementById("completedTasks");

// Render tasks on page
function renderTasks() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const button = document.createElement("button");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        span.innerText = task.name;
        button.innerText = "Delete";
        button.addEventListener("click", () => deleteTask(i));
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(button);
        if (task.date) {
            const date = document.createElement("span");
            date.innerText = ` (${task.date})`;
            listItem.appendChild(date);
        }
        taskList.appendChild(listItem);
    }
}

// Render completed tasks on page
function renderCompletedTasks() {
    completedTasksList.innerHTML = "";
    for (let i = 0; i < completedTasks.length; i++) {
        const task = completedTasks[i];
        const listItem = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = task.name;
        listItem.appendChild(span);
        if (task.date) {
            const date = document.createElement("span");
            date.innerText = ` (${task.date})`;
            listItem.appendChild(date);
        }
        completedTasksList.appendChild(listItem);
    }
}

// Add task
function addTask(event) {
    event.preventDefault();
    const name = document.getElementById("task").value;
    const date = document.getElementById("date").value;
    tasks.push({ name, date, completed: false });
    renderTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskList.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
        tasks[index].completed = event.target.checked;
        if (event.target.checked) {
            const completedTask = tasks.splice(index, 1)[0];
            completedTasks.push(completedTask);
        } else {
            const uncompletedTask = completedTasks.splice(index, 1)[0];
            tasks.push(uncompletedTask);
        }
        renderTasks();
        renderCompletedTasks();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
});

// Load tasks on page load
renderTasks();
renderCompletedTasks();

// Add task event listener
taskForm.addEventListener("submit", addTask);
