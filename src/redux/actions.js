export const addContact = (name, number) => {
    return {
        type: "addContact",
        payload: {
            id: crypto.randomUUID(),
            name,
            number
        }
    }
}

export const deleteContact = (id) => {
    return {
        type: "deleteContact",
        payload: id,
    }
}

export const filterChange = (filter) => {
    return {
        type: "filterChange",
        payload: filter
    }
}