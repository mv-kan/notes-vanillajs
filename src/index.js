import {notes, addNoteNow, removeNote} from "./notes.js"
import { addNoteHandler, editNoteHandler } from "./form.js"
import {updateCurrentNotes} from "./rendering.js"

console.log(notes)

const newidnote = addNoteNow("sdf", "sdf", "sdf")

console.log(notes)
console.log(removeNote(newidnote))
console.log(notes)

updateCurrentNotes()

document.querySelector(".js-input-note").addEventListener('submit', addNoteHandler);
document.querySelector(".js-edit-note").addEventListener('submit', editNoteHandler);
document.querySelector("#js-viewmode").addEventListener('change', updateCurrentNotes)