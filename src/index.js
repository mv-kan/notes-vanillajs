import {notes, addNoteNow, removeNote} from "./notes.js"
import { addNoteHandler, editNoteHandler } from "./form.js"
import {updateAllNotes} from "./rendering.js"

console.log(notes)

const newidnote = addNoteNow("sdf", "sdf", "sdf")

console.log(notes)
console.log(removeNote(newidnote))
console.log(notes)

updateAllNotes()
document.querySelector(".js-input-note").addEventListener('submit', addNoteHandler);
document.querySelector(".js-edit-note").addEventListener('submit', editNoteHandler);