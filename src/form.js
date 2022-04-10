import { addNoteNow, notes } from "./notes.js";
import { updateAllNotes } from "./rendering.js";

export function addNoteHandler(e) {
    var content = document.getElementById("content").value
    var category = document.getElementById("category").value
    var name = document.getElementById("name").value
    addNoteNow(name, parseInt(category), content)
    updateAllNotes()
    console.log(notes)
    e.preventDefault();
}

