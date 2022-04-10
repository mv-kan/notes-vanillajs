import {notes, addNoteNow, removeNote} from "./notes.js"
import {getNoteHTML, getAllNotesHTML} from "./rendering.js"

console.log(notes)

const newidnote = addNoteNow("sdf", "sdf", "sdf")

console.log(notes)
console.log(removeNote(newidnote))
console.log(notes)
const notesList = document.querySelector("#js-notes-list")
notesList.innerHTML += getAllNotesHTML().join("\n")
