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

let tasks = [];

const addTsk = document.querySelector(".addTsk");
const addBtn = document.querySelector(".add-btn");

function handleAddTask() {
  const recentlyAddedContainer = document.querySelector(
    ".recently-added-container",
  );
  const taskText = addTsk.value;
  recentlyAddedContainer.innerHTML = "Recently added task:";
  if (taskText.trim() !== "") {
    const recentTask = document.createElement("p");
    recentTask.setAttribute("class", "recently-added");
    recentTask.innerHTML = `${taskText}`;
    recentlyAddedContainer.appendChild(recentTask);
    tasks.push({
      text: taskText,
      completed: false,
    });
    saveTasks();
    renderTasks();
    addTsk.value = "";
  } else {
    const recentlyAddedContainer = document.querySelector(
      ".recently-added-container",
    );
    recentlyAddedContainer.innerHTML = "Enter a valid task";
  }
}

addBtn.addEventListener("click", handleAddTask);
addTsk.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
});
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
  } else {
    tasks = [];
  }
}
function updateTaskCount() {
  const count = tasks.filter((task) => !task.completed).length;
  const taskCounter = document.querySelector(".tasks-counter");
  taskCounter.innerHTML = `${count} tasks left`;
}

const taskList = document.querySelector(".task-list");
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-li");
    li.innerHTML = `
      <span class="input-cont">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} data-index="${index}" id = "task${index}"/>
        <label class="${task.completed ? "completed" : ""}" for="task${index}">${task.text}</label>
      </span>
      <button class="delete-btn" data-index="${index}">❌</button>
    `;
    taskList.appendChild(li);
  });
  updateTaskCount();
}

taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  if (e.target.type === "checkbox") {
    tasks[index].completed = e.target.checked;
    saveTasks();
    renderTasks();
  }
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks(); // 👈 important
});

const Searchbox = document.querySelector(".searchTsk");
const searchBtn = document.querySelector(".srch-btn");

function handleSearch() {
  const searched = document.querySelector(".searched");
  const searchText = Searchbox.value.trim().toLowerCase();

  searched.innerHTML = "";

  if (searchText === "") {
    searched.textContent = "Please enter a search term!";
    return;
  }

  let found = false;

  tasks.forEach((task) => {
    if (task.text.toLowerCase().includes(searchText)) {
      const div = document.createElement("div");
      div.classList.add("search-result");
      div.innerHTML = `<span class="search-result">Found: ${task.text}</span>`;
      searched.appendChild(div);
      found = true;
    }
  });

  if (!found) {
    searched.textContent = "No tasks found!";
  }

  Searchbox.value = "";
}
searchBtn.addEventListener("click", handleSearch);
Searchbox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

loadTasks();
renderTasks();