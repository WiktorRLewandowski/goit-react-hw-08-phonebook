import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkApi) => {
    try {
        const response = await axios.get("/contacts")
        return response.data
    } catch (e) {
        return thunkApi.rejectWithValue(e.message)
    }
})

export const addContact = createAsyncThunk("contacts/addContact", 
    async (contact, thunkApi) => {
        try {
            const response = await axios.post("/contacts", contact)
            return response.data 
        } catch(e) {
            return thunkApi.rejectWithValue(e.message)
        }
})

export const deleteContact = createAsyncThunk("contacts/deleteContact",
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(`/contacts/${id}`)
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)