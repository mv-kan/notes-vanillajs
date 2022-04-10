import { setEditForm } from "./form.js"
import {
    dateToString,
    detectDates,
    categories,
    notes,
    removeNote,
    getStats,
    getCategory,
    getNote,
    isArchived,
    removeFromArchived,
    addToArchived
} from "./notes.js"

export function getStatsHTML(record) {
    var categoryName = getCategory(record.categoryId).name
    var active = record.active
    var archived = record.archived

    return `
        <div class="stats">
            <span class="stats__field bg-light">${categoryName}</span>
            <span class="stats__field bg-light">${active}</span>
            <span class="stats__field bg-light">${archived}</span>
        </div>
    `
}

export function getAllStatsHTML() {
    const records = getStats()
    const recordsHTML = []
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        recordsHTML.push(getStatsHTML(record))
    }
    return recordsHTML
}

export function getNoteHTML(id) {
    const note = getNote(id)
    if (note !== null) {
        const content = note.content.length > 25 ? note.content.slice(0, 22) + '...' : note.content
        const dates = detectDates(note.content).join(", ")
        return `
        <div class="note js-note " id="${note.id}">
            <span class="note__field bg-light">${note.name}</span>
            <span class="note__field bg-light">${dateToString(note.created)}</span>
            <span class="note__field bg-light note__field--content">${content}</span>
            <span class="note__field bg-light">${categories.find((c) => c.id === note.category).name}</span>
            <span class="note__field bg-light">${dates}</span>
            <div class="note__buttons bg-light">
                ${!isArchived(id) ?
                    `<div class="note__btn">
                    <button class="btn btn-primary btn-archive js-btn-archive">Archive</button>
                </div>`:
                    `<div class="note__btn">
                    <button class="btn btn-primary btn-archive js-btn-unarchive">Unarchive</button>
                </div>`}
                
                <div class="note__btn">
                    <button class="btn btn-primary js-btn-edit">View</button>
                </div>
                <div class="note__btn">
                    <button class="btn btn-danger js-btn-remove">Remove</button>
                </div>
            </div>
        </div>
    `
    }
    else {
        return `<div>ID "${id}" NOT FOUND!!!</div>`
    }
}

export function getAllNotesHTML() {
    const notesHTML = []
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        notesHTML.push(getNoteHTML(note.id))
    }
    return notesHTML
}

export function getArchivedNotesHTML() {
    const archivedNotes = notes.filter((note) => {
        return isArchived(note.id)
    })
    const notesHTML = archivedNotes.map((note) => getNoteHTML(note.id))
    return notesHTML
}

export function getNotesHTML() {
    const usualNotes = notes.filter((note) => {
        return !isArchived(note.id)
    })
    const notesHTML = usualNotes.map((note) => getNoteHTML(note.id))
    return notesHTML
}

function renderAllNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML += getAllNotesHTML().join("\n")
    // add functionality to buttons
    document.querySelectorAll(".js-note").forEach((note) => {
        note.querySelector(".js-btn-unarchive")?.addEventListener("click", (e) => {
            removeFromArchived(note.id)
            updateCurrentNotes()
        })
        note.querySelector(".js-btn-archive")?.addEventListener("click", (e) => {
            addToArchived(note.id)
            updateCurrentNotes()
        })
        note.querySelector(".js-btn-edit").addEventListener("click", (e) => {
            setEditForm(note.id)
        })
        note.querySelector(".js-btn-remove").addEventListener("click", (e) => {
            removeNote(note.id)
            updateCurrentNotes()
        })
    })
}

function renderArchivedNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML += getArchivedNotesHTML().join("\n")
    // add functionality to buttons
    document.querySelectorAll(".js-note").forEach((note) => {
        note.querySelector(".js-btn-unarchive")?.addEventListener("click", (e) => {
            removeFromArchived(note.id)
            updateCurrentNotes()
        })
        note.querySelector(".js-btn-archive")?.addEventListener("click", (e) => {
            addToArchived(note.id)
            updateCurrentNotes()
        })
        note.querySelector(".js-btn-edit").addEventListener("click", (e) => {
            setEditForm(note.id)
        })
        note.querySelector(".js-btn-remove").addEventListener("click", (e) => {
            removeNote(note.id)
            updateCurrentNotes()
        })
    })
}

function renderNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML += getNotesHTML().join("\n")
    // add functionality to buttons
    document.querySelectorAll(".js-note").forEach((note) => {
        note.querySelector(".js-btn-unarchive")?.addEventListener("click", (e) => {
            removeFromArchived(note.id)
            updateCurrentNotes()
        })
        note.querySelector(".js-btn-archive")?.addEventListener("click", (e) => {
            addToArchived(note.id)
            updateCurrentNotes()
        })
        note.querySelector(".js-btn-edit").addEventListener("click", (e) => {
            setEditForm(note.id)
        })
        note.querySelector(".js-btn-remove").addEventListener("click", (e) => {
            removeNote(note.id)
            updateCurrentNotes()
        })
    })
}

function renderStats() {
    const statsList = document.querySelector("#js-stats-list")
    statsList.innerHTML += getAllStatsHTML().join('\n')
}

export function updateAllNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML = ""
    renderAllNotes()
}

export function updateArchivedNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML = ""
    renderArchivedNotes()
}

export function updateNotes() {
    const notesList = document.querySelector("#js-notes-list")
    notesList.innerHTML = ""
    renderNotes()
}

export function udpateStats() {
    const statsList = document.querySelector("#js-stats-list")
    statsList.innerHTML = ""
    renderStats()
}

export function updateCurrentNotes() {
    const viewmode = document.querySelector("#js-viewmode").value
    udpateStats()
    switch (viewmode) {
        case "usual":
            updateNotes()
            break;
        case "archived":
            updateArchivedNotes()
            break;
        case "all":
            updateAllNotes()
            break;
        default:
            break;
    }
}