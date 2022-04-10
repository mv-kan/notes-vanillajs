import {dateToString, detectDates, categories, notes} from "./notes.js"

export function getNoteHTML(note) {
    const content = note.content.length > 25 ? note.content.slice(0, 22) + '...' : note.content
    const dates = detectDates(note.content).map((date) => dateToString(date)).join(", ")
    return `
        <div class="note js-note">
            <span class="note__field">${note.name}</span>
            <span class="note__field">${dateToString(note.created)}</span>
            <span class="note__field note__field--content">${content}</span>
            <span class="note__field">${categories.find((c) => c.id === note.category).name}</span>
            <span class="note__field">${dates}</span>
            <div class="note__btn">
                <button class="btn btn-primary ">Edit</button>
            </div>
            <div class="note__btn">
                <button class="btn btn-danger ">Remove</button>
            </div>
        </div>
    `
}

export function getAllNotesHTML() {
    const notesHTML = []
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        notesHTML.push(getNoteHTML(note))
    }
    return notesHTML
}

function renderAllNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML += getAllNotesHTML().join("\n")
}

export function updateAllNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML = ""
    renderAllNotes()
}