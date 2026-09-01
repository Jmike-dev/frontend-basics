const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const li = document.createElement("li");
  li.innerText = task.text;
  if (task.completed) li.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function loadTasks() {
  taskList.innerHTML = "";
  getTasks().forEach(renderTask);
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task! Please");
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);

  renderTask({ text: taskText, completed: false });
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", function (event) {
  const items = Array.from(taskList.children);

  if (event.target.classList.contains("delete-btn")) {
    const index = items.indexOf(event.target.parentElement);
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    event.target.parentElement.remove();
  } else if (event.target.tagName === "LI") {
    const index = items.indexOf(event.target);
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    event.target.classList.toggle("completed");
  }
});

loadTasks();
