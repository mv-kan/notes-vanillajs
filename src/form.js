import { addNoteNow, getNote, editNote } from "./notes.js";
import { updateCurrentNotes } from "./rendering.js";

export function addNoteHandler(e) {
    var content = document.getElementById("content").value
    var category = document.getElementById("category").value
    var name = document.getElementById("name").value
    addNoteNow(name, parseInt(category), content)
    document.getElementById("content").value = ""
    document.getElementById("name").value = ""
    updateCurrentNotes();
    clearEditForm()
    e.preventDefault();
}

export function editNoteHandler() {
    const form = document.querySelector(".js-input-note")
    var content = document.getElementById("content").value
    var category = document.getElementById("category").value
    var name = document.getElementById("name").value
    if (editNote(form.id, name, parseInt(category), content) === null) {
        throw `Editing note was unsuccessful! id = ${form.id}`
    }
    clearEditForm()
    updateCurrentNotes();
}

export function setEditForm(id) {
    clearEditForm()
    const note = getNote(id)
    const form = document.querySelector(".js-input-note")
    form.querySelector("#name").value = note.name
    form.querySelector("#content").value = note.content
    form.querySelector("#category").value = note.category.toString()
    form.id = id
    
    const buttonsWrapper = document.querySelector(".js-note-form__button-wrapper")
    buttonsWrapper.innerHTML += `<button class="btn btn-primary btn-edit-note js-btn-edit-note">Edit</button>`
    buttonsWrapper.innerHTML += `<button class="btn btn-danger js-btn-cancel-note">Cancel</button>`

    // get edit button
    const editButton = document.querySelector(".js-btn-edit-note")
    // add event listener onclick
    editButton.addEventListener("click", editNoteHandler)

    // get cancel button
    const cancelButton = document.querySelector(".js-btn-cancel-note")
    // add event listner
    cancelButton.addEventListener("click", clearEditForm)
}

function clearEditForm() {
    // get buttons to clear
    const cancelButton = document.querySelector(".js-btn-cancel-note")
    const editButton = document.querySelector(".js-btn-edit-note")
    if(cancelButton !== null) {
        cancelButton.parentNode.removeChild(cancelButton)
    }
    if (editButton !== null) {
        editButton.parentNode.removeChild(editButton)
    }

    document.getElementById("content").value = ""
    document.getElementById("name").value = ""
}
