import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://64bd57cd2320b36433c7a2c6.mockapi.io/contacts'

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkApi) => {
    try {
        const response = await axios.get("/tasks")
        return response.data
    } catch (e) {
        return thunkApi.rejectWithValue(e.message)
    }
})