import { addNoteNow, notes, getNote, editNote } from "./notes.js";
import { updateAllNotes } from "./rendering.js";

export function addNoteHandler(e) {
    var content = document.getElementById("content").value
    var category = document.getElementById("category").value
    var name = document.getElementById("name").value
    addNoteNow(name, parseInt(category), content)
    document.getElementById("content").value = ""
    document.getElementById("name").value = ""
    updateAllNotes()
    e.preventDefault();
}

export function editNoteHandler(e) {
    var content = document.getElementById("edit-content").value
    var category = document.getElementById("edit-category").value
    var name = document.getElementById("edit-name").value
    editNote(this.id, name, parseInt(category), content)
    updateAllNotes()
    e.preventDefault();
}

export function setEditForm(id) {
    const note = getNote(id)
    const form = document.querySelector(".js-edit-note")
    form.querySelector("#edit-name").value = note.name
    form.querySelector("#edit-content").value = note.content
    form.querySelector("#edit-category").value = note.category.toString()
    form.id = id
}

