const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

const API_BASE = "https://dummyjson.com/todos";

let tasks = [];

function renderTask(task) {
  const li = document.createElement("li");
  li.innerText = task.todo;
  li.dataset.id = task.id;
  if (task.completed) li.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function renderAll() {
  taskList.innerHTML = "";
  tasks.forEach(renderTask);
}

async function loadTasks() {
  try {
    const res = await fetch(`${API_BASE}?limit=10`);
    const data = await res.json();
    tasks = data.todos;
    renderAll();
  } catch (err) {
    console.error("Failed to load tasks:", err);
    alert("Could not load tasks from the API.");
  }
}

async function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task! Please");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: taskText,
        completed: false,
        userId: 1,
      }),
    });
    const newTask = await res.json();

    tasks.push(newTask);
    renderTask(newTask);
    taskInput.value = "";
  } catch (err) {
    console.error("Failed to add task:", err);
    alert("Could not add task.");
  }
}

async function toggleTask(id, li) {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return;

  const newCompleted = !task.completed;

  try {
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newCompleted }),
    });

    task.completed = newCompleted;
    li.classList.toggle("completed");
  } catch (err) {
    console.error("Failed to update task:", err);
    alert("Could not update task.");
  }
}

async function deleteTask(id, li) {
  try {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });

    tasks = tasks.filter((t) => t.id !== Number(id));
    li.remove();
  } catch (err) {
    console.error("Failed to delete task:", err);
    alert("Could not delete task.");
  }
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", function (event) {
  const li = event.target.closest("li");
  if (!li) return;

  if (event.target.classList.contains("delete-btn")) {
    deleteTask(li.dataset.id, li);
  } else if (event.target.tagName === "LI") {
    toggleTask(li.dataset.id, li);
  }
});

loadTasks();
