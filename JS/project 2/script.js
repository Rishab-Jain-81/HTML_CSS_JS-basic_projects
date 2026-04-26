let MyNotes = [];
function saveNotes() {
  localStorage.setItem("MyNotes", JSON.stringify(MyNotes));
}
function loadNotes() {
  let data = localStorage.getItem("MyNotes");
  MyNotes = JSON.parse(data) || [];
}
function renderNotes() {
  const notesContainer = document.querySelector(".notesContainer");
  notesContainer.innerHTML = "";
  if (MyNotes.length === 0) {
    notesContainer.innerHTML = `
      <div class="emptyStateCon">
        <img src="./assets/note.png" class="emptyStateImg" />
        <p class="emptyState">No Notes yet, Add one!</p>
      </div>
    `;
    return;
  }
  MyNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    const newDate = new Date(note.date);
    const addedOn = newDate.toLocaleString();
    noteDiv.innerHTML = `
        <div class="noteCard" data-id = "${note.id}">
          <h2 class="notesTitle">${note.title}</h2>
          <p class="notesContent">${note.text}</p>
          <div class="noteFooter">
            <p class="addTime">added on: ${addedOn}</p>
            <div class="buttons">
              <button title="Edit Note" data-id = "${note.id}" class="btnIcon editBtn">
                <img data-id = "${note.id}" src="./assets/pencil.png" alt="editIcon" class="editIcon editBtn" />
              </button>
              <button title="Delete Note" data-id = "${note.id}" class="btnIcon deleteBtn">
                <img data-id = "${note.id}" src="./assets/rubbish.png" alt="deleteIcon" class="deleteIcon deleteBtn" />
              </button>
            </div>
          </div>
        </div>`;
    notesContainer.appendChild(noteDiv);
  });
}
function addNotes() {
  const textHeading = document.querySelector(".headingText").value;
  const text = document.querySelector(".newNote").value.trim();
  if (!text) return;
  MyNotes.push({
    id: Date.now(),
    title: textHeading,
    text: text,
    date: Date.now(),
  });
  document.querySelector(".newNote").value = "";
  document.querySelector(".headingText").value = "";
  document.querySelector(".headingText").focus();
  saveNotes();
  renderNotes();
}
function deleteNote(id) {
  MyNotes = MyNotes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}
function editNote(card){
  const content = card.querySelector(".notesContent");
  const editBtn = card.querySelector(".editBtn");
  const addTime = card.querySelector(".addTime");
  content.contentEditable = "true";
  content.classList.toggle("open");
  content.focus();
  editBtn.classList.add("saveBtn");
  editBtn.title = "Save Note";
  editBtn.innerHTML = `<img data-id = "${card.dataset.id}" src="./assets/save.png" class="editIcon" />`;
  addTime.innerHTML = "";
}
function saveEdit(card, id){
  const content = card.querySelector(".notesContent");
  const newText = content.textContent.trim();
  const note = MyNotes.find((n) => n.id === id);
  if (note) note.text = newText;
  saveNotes();
  renderNotes();
}
const notesContainer = document.querySelector(".notesContainer");
notesContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".editBtn");
  const deleteBtn = e.target.closest(".deleteBtn");
  if(!deleteBtn && !editBtn) return;
  const id = Number((deleteBtn || editBtn).dataset.id);
  const card = document.querySelector(`.noteCard[data-id="${id}"]`);
  if (deleteBtn) {
    deleteNote(id);
    return;
  }
 if(editBtn.classList.contains("saveBtn")){
    saveEdit(card, id);
    return;
  }else{
    editNote(card);
  }
});
const newNote = document.querySelector(".newNote");
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", () => addNotes());
newNote.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    addNotes();
  }
});
loadNotes();
renderNotes();