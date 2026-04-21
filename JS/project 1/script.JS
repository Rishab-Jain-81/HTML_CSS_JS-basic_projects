let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  let data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  } else {
    tasks = [];
  }
}
function renderTasks() {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-li");
    li.innerHTML = `
        <div> 
        <input  type="checkbox" data-index="${index}"${task.completed ? " checked" : ""}"/>
        <span class="${task.completed ? "completed" : ""}">${task.text}</span>
        <button class="delete-btn" data-index="${index}">❌</button>
        </div>`;
    taskList.appendChild(li);
  });
  updateTaskCount();
}
function addTask(text) {
  if (!text.trim()) return;
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
}
function handleAddTask() {
  const addedCon = document.querySelector(".recently-added-container");
  addedCon.innerHTML = "Recently added task:";
  const addTsk = document.querySelector(".addTsk");
  const taskText = addTsk.value;
  addTsk.value = "";
  addTsk.focus();
  if (taskText.trim() !== "") {
    addedCon.innerHTML = "added: " + taskText;
  } else {
    addedCon.innerHTML = "Enter a valid task";
  }
  addTask(taskText);
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
function clearTasks() {
  tasks = [];
  saveTasks();
  renderTasks();
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
function updateTaskCount() {
  const count = tasks.filter((task) => !task.completed).length;
  const taskCounter = document.querySelector(".tasks-counter");
  taskCounter.innerHTML = `${count} tasks left`;
}
function searchTask() {
  const searchTask = document.querySelector(".searchTsk");
  const searchText = searchTask.value.toLowerCase();
  const searched = document.querySelector(".searched");
  searched.innerHTML = "";
  if (searchText !== "") {
    const filteredSearch = tasks.filter((task) => {
      return task.text.toLowerCase().includes(searchText);
    });
    if (filteredSearch.length > 0) {
      searched.innerHTML = "result: " + filteredSearch;
    } else {
      searched.innerHTML = "No tasks found!";
    }
  } else {
    searched.innerHTML = "Please enter a search term!";
  }
  searchTask.value = "";
  searchTask.focus();
}
const addBtn = document.querySelector(".add-btn");
const addTsk = document.querySelector(".addTsk");
addBtn.addEventListener("click", handleAddTask);
addTsk.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
});
const taskList = document.querySelector(".task-list");
taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("delete-btn")) {
    deleteTask(index);
  }
  if (e.target.type === "checkbox") {
    toggleTask(index);
  }
});
const clearBtn = document.querySelector(".clear-btn");
const searchBtn = document.querySelector(".srch-btn");
const Searchbox = document.querySelector(".searchTsk");
clearBtn.addEventListener("click", clearTasks);
searchBtn.addEventListener("click", searchTask);
Searchbox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchTask();
  }
});
loadTasks();
renderTasks();
