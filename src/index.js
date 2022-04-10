import {notes, addNoteNow, removeNote} from "./notes.js"
import { addNoteHandler } from "./form.js"
import {getNoteHTML, getAllNotesHTML, updateAllNotes} from "./rendering.js"

console.log(notes)

const newidnote = addNoteNow("sdf", "sdf", "sdf")

console.log(notes)
console.log(removeNote(newidnote))
console.log(notes)

updateAllNotes()
document.querySelector(".js-input-note").addEventListener('submit', addNoteHandler);
