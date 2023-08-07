import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}` 
}

const clearAuthHeader = token => {
    axios.defaults.headers.common.Authorization = ''
}

// POST @  /users/signup
// body: { name, email, password }

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/users/signup', credentials)
            setAuthHeader(res.data.token)
            return res.data
        } catch(error) {
            Notify.failure("Something went wrong... Couldn't register user.")
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// POST @  /users/login
// body: { email, password }

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/users/login', credentials)
            setAuthHeader(res.data.token)
            return res.data
        } catch(error) {
            Notify.failure('No such account')
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('/users/logout')
            clearAuthHeader()
        } catch(error) {
            Notify.failure(error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// GET @  /users/current
// headers: Authorization: Bearer token

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState()
        const persistedToken = state.auth.token

        if (persistedToken === null) {
            Notify.failure("Unable to fetch user")
            return thunkAPI.rejectWithValue('Unable to fetch user')
        }

        try {
            setAuthHeader(persistedToken)
            const res = await axios.get('users/current')
            return res.data
        } catch(error) {
            Notify.failure(error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)