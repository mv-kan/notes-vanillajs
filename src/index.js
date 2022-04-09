import {notes, addNoteNow, detectDates, removeNote} from "./notes.js"

console.log(notes)

const newidnote = addNoteNow("sdf", "sdf", "sdf")

console.log(notes)
console.log(removeNote(newidnote))
console.log(notes)
