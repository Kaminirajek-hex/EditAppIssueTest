import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'editentity'

export const fetchEditentity = createAsyncThunk(
    'editentity/fetchEditentity',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const editentity = await response.data
        return editentity
    }
)

export const addEditentity = createAsyncThunk(
    'editentity/addEditentity',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const editentity = await response.data
        thunkAPI.dispatch(showSuccess('Editentity added successfully'))
        return editentity
    }
)

export const editEditentity = createAsyncThunk(
    'editentity/editEditentity',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const editentity = await response.data
        thunkAPI.dispatch(showSuccess('Editentity updated successfully'))
        return editentity
    }
)

export const deleteEditentity = createAsyncThunk(
    'editentity/deleteEditentity',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected editentity deleted successfully.')
            )
            return data.id
        }
    }
)
