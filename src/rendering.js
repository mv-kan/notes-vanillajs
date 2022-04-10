import {dateToString, detectDates, categories, notes} from "./notes.js"

export function getNoteHTML(note) {
    const content = note.content.length > 100 ? note.content.slice(90) + '...' : note.content
    const dates = detectDates(note.content).map((date) => dateToString(date)).join(", ")
    return `
        <div class="note js-note">
            <span class="note__field">${note.name}</span>
            <span class="note__field">${dateToString(note.created)}</span>
            <span class="note__field">${content}</span>
            <span class="note__field">${categories[note.category].name}</span>
            <span class="note__field">${dates}</span>
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
