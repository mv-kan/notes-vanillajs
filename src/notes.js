export const categories = [
    {
        id: 0,
        name: "Task"
    },
    {
        id: 1,
        name: "Random Thoughts"
    },
    {
        id: 2,
        name: "Idea"
    }
]

export const notes = [
    {
        id: chance.guid(),
        name: "The name 1",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name 2",
        created: new Date(Date.now()),
        category: 2, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name 3",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name 4",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name 5",
        created: new Date(Date.now()),
        category: 2, // id of category
        content: "Something something 01/11/2020 and something on 02/02/2022"
    },
    {
        id: chance.guid(),
        name: "The name 5",
        created: new Date(Date.now()),
        category: 0, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: chance.guid(),
        name: "The name 6",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
    {
        id: "0",
        name: "The name 10",
        created: new Date(Date.now()),
        category: 1, // id of category
        content: "Something something 01/11/2020"
    },
]

export const archivedNotes = [
    {
        id: "0"
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
    const regex = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g
    const matches = text.match(regex);
    if (matches !== null) {
        return matches.map((match) => { return new Date(match) });
    }
    else {
        return []
    }
}

export function removeNote(id) {
    /**
     * @returns id of deleted element otherwise null
     */
    const noteIndex = notes.findIndex((note)=> note.id === id)
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1)
        return id
    }
    else {
        return null
    }
}

export function editNote(id, name, category, content) {
    /**
     * if succeded 
     * @returns id if success otherwise null
     */
    const note = notes.find((note) => note.id === id)
    if (note !== undefined) {
        note.name = name
        note.category = category
        note.content = content
        return id 
    }
    else {
        return null
    }
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

export function getNote(id) {
    /**
     * @returns copy of note obj if exists, otherwise null 
     */
    const note = notes.find((note) => note.id === id)
    if (note !== undefined) {
        return {...note}
    } else {
        return null  
    }
}

export function getCategory(id) {
    /**
     * @returns copy of category obj if exists, otherwise null 
     */
    const category = categories.find((category) => category.id === id)
    if (category !== undefined) {
        return { ...category }
    } else {
        return null
    }
}

export function isArchived(id) {
    const note = getNote(id)
    for (let i = 0; i < archivedNotes.length; i++) {
        const record = archivedNotes[i];
        if (note.id === record.id) {
            return true
        }
    }
    return false
}

export function removeFromArchived(id) {
    if (isArchived(id)){
        const i = archivedNotes.findIndex((r) => r.id === id)
        archivedNotes.splice(i, 1)
    }
}

export function addToArchived(id) {
    if (!isArchived(id) && getNote(id) !== null) {
        archivedNotes.push(
            {
                id
            }
        )
    }
}

export function getStats() {
    /**
     * {
     *  catid
     *  active
     *  archived
     * } 
     *
     */
    const result = []
    for (let i = 0; i < categories.length; i++) {
        const categoryId = categories[i].id;
        var active = 0
        var archived = 0
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (note.category === categoryId) {
                isArchived(note.id) ? archived++ : active++;
            }
        }
        result.push({
            categoryId: categoryId,
            active,
            archived
        })
    }
    return result
}