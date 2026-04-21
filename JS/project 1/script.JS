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
  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="empty-state">No tasks yet. Add one!</p>`;
    updateTaskCount();
    return;
  }
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-li");
    li.innerHTML = `
        <div> 
        <input type="checkbox" data-id="${task.id}"  ${task.completed ? " checked" : ""} />
        <span class="${task.completed ? "completed" : ""}"> ${task.text} </span>
        </div>
        <button class="delete-btn" data-id="${task.id}">❌</button>
        `;
    taskList.appendChild(li);
  });
  updateTaskCount();
}
function addTask(text) {
  if (!text.trim()) return;
  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
  });
  saveTasks();
  renderTasks();
}
function handleAddTask() {
  const addedCon = document.querySelector(".recently-added-container");
  addedCon.textContent = "";
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
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}
function clearTasks() {
  tasks = [];
  saveTasks();
  renderTasks();
}
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.completed = !task.completed;
  }

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
      searched.innerHTML = "";
      filteredSearch.forEach((task) => {
        const p = document.createElement("p");
        p.innerHTML = "result: " + task.text;
        searched.appendChild(p);
      });
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
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains("delete-btn")) {
    deleteTask(id);
  }
  if (e.target.type === "checkbox") {
    toggleTask(id);
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

const darkBtn = document.querySelector(".drmd-btn");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const logo = document.querySelector(".logo");
  if (document.body.classList.contains("dark")) {
    logo.src = "./assets/Logo-dark.png";
    darkBtn.innerHTML =
      '<img src="./assets/white-balance.png" alt="light-mode-icon" class="drmd-img"/>';
  } else {
    logo.src = "./assets/Logo.png";
    darkBtn.innerHTML =
      '<img src="./assets/night-mode (1).png" alt="night-mode-icon" class="drmd-img"/>';
  }
});
