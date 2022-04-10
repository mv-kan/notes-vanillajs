export const categories = [
    {
        id: 1,
        name: "Task"
    },
    {
        id: 2,
        name: "Random Thoughts"
    },
    {
        id: 3,
        name: "Idea"
    }
]

export const notes = [
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: 0,
        name: "The name",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
]

export const archivedNotes = [
    {
        id: 0
    }
]

export function addNote(name, created, category, content) {
    /**
     * @returns id of created note 
     */
    const id = chance.guid()
    notes.push(
        {
            id,
            name,
            created,
            category,
            content
        }
    )     
    return id
}

export function addNoteNow(name, category, content) {
    /**
     * the same func as addNote but created replaced with Now 
     * @returns id of created note
     */
    return addNote(name, new Date(Date.now()), category, content)
}

export function detectDates(text) {
    /**
     * @returns array with all dates in text 
     */
    const matches = text.match(/\d{2}(\D)\d{2}\1\d{4}/g);
    return matches.map((match) => { return new Date(match) } );
}

export function removeNote(id) {
    /**
     * @returns index of deleted element otherwise -1 
     */
    const noteIndex = notes.findIndex((note)=> note.id === id)
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1)
        return noteIndex
    }
    else {
        return -1
    }
}

export function editNote(id, name, category, content) {

}

export function dateToString(date) {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }
    return formatDate(date);
}
