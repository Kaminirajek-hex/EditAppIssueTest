import { createSlice } from '@reduxjs/toolkit'
import { fetchEditentity } from './editentity.action'
import { addEditentity } from './editentity.action'
import { editEditentity } from './editentity.action'
import { deleteEditentity } from './editentity.action'

const fetchEditentityExtraReducer = {
    [fetchEditentity.pending]: (state, action) => {
        state.loading = true
    },
    [fetchEditentity.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchEditentity.rejected]: (state, action) => {
        state.loading = false
    },
}

const addEditentityExtraReducer = {
    [addEditentity.pending]: (state, action) => {
        state.loading = true
    },
    [addEditentity.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addEditentity.rejected]: (state, action) => {
        state.loading = false
    },
}

const editEditentityExtraReducer = {
    [editEditentity.pending]: (state, action) => {
        state.loading = true
    },
    [editEditentity.fulfilled]: (state, action) => {
        const { id, editone, edittwo, editthree } = action.payload
        const existingEditentity = state.entities.find(
            (editentity) => editentity?.id?.toString() === id?.toString()
        )
        if (existingEditentity) {
            existingEditentity.editone = editone
            existingEditentity.edittwo = edittwo
            existingEditentity.editthree = editthree
        }
        state.loading = false
    },
    [editEditentity.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteEditentityExtraReducer = {
    [deleteEditentity.pending]: (state, action) => {
        state.loading = true
    },
    [deleteEditentity.fulfilled]: (state, action) => {
        const id = action.payload
        const existingEditentity = state.entities.find(
            (editentity) => editentity.id.toString() === id.toString()
        )
        if (existingEditentity) {
            state.entities = state.entities.filter(
                (editentity) => editentity.id !== id
            )
        }
        state.loading = false
    },
    [deleteEditentity.rejected]: (state, action) => {
        state.loading = false
    },
}
const editentitySlice = createSlice({
    name: 'editentity',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        editentityAdded(state, action) {
            state.entities.push(action.payload)
        },
        editentityUpdated(state, action) {
            const { id, editone, edittwo, editthree } = action.payload
            const existingEditentity = state.entities.find(
                (editentity) => editentity.id.toString() === id.toString()
            )
            if (existingEditentity) {
                existingEditentity.editone = editone
                existingEditentity.edittwo = edittwo
                existingEditentity.editthree = editthree
            }
        },
        editentityDeleted(state, action) {
            const { id } = action.payload
            const existingEditentity = state.entities.find(
                (editentity) => editentity.id.toString() === id.toString()
            )
            if (existingEditentity) {
                state.entities = state.entities.filter(
                    (editentity) => editentity.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchEditentityExtraReducer,
        ...addEditentityExtraReducer,
        ...editEditentityExtraReducer,
        ...deleteEditentityExtraReducer,
    },
})

export const { editentityAdded, editentityUpdated, editentityDeleted } =
    editentitySlice.actions

export default editentitySlice.reducer
