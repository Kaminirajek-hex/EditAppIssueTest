import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchEditentity,
    addEditentity,
    editEditentity,
    deleteEditentity,
} from '../editentity.action'

const getEditentityListResponse = [
    {
        id: 1,
        editone: 'editone',
        edittwo: false,
        editthree: 86,
    },
]

const addEditentityListResponse = (data) => {
    return { id: 2, ...data }
}
const editEditentityListResponse = (data) => {
    return data
}

describe('should test Editentity redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'editentity'
    test('Should be able to fetch the editentity list and update editentity redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getEditentityListResponse)
        const result = await store.dispatch(fetchEditentity())
        const editentityList = result.payload
        expect(result.type).toBe('editentity/fetchEditentity/fulfilled')
        expect(editentityList).toEqual(getEditentityListResponse)

        const state = store.getState().editentity
        expect(state.entities).toEqual(editentityList)
    })

    test('Should be able to add new editentity to list and make post api and update editentity redux store', async () => {
        const body = {
            editone: 'editone',
            edittwo: false,
            editthree: 8,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addEditentityListResponse(body)
        )
        const result = await store.dispatch(addEditentity(body))
        const editentityItem = result.payload
        expect(result.type).toBe('editentity/addEditentity/fulfilled')
        expect(editentityItem).toEqual(addEditentityListResponse(body))

        const state = store.getState().editentity
        expect(state.entities).toContainEqual(addEditentityListResponse(body))
    })

    test('Should be able to edit editentity in list and make put api call and update editentity redux store', async () => {
        const body = {
            id: 1,
            editone: 'editone',
            edittwo: false,
            editthree: 31,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editEditentityListResponse(body)
        )
        const result = await store.dispatch(editEditentity(body))
        const editentityItem = result.payload
        expect(result.type).toBe('editentity/editEditentity/fulfilled')
        expect(editentityItem).toEqual(editEditentityListResponse(body))

        const state = store.getState().editentity
        let changedEditentity = state.entities.find((p) => p.id === body.id)
        expect(changedEditentity.name).toEqual(body.name)
    })

    test('Should be able to delete editentity in list and update editentity redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().editentity
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteEditentity(input))
        const deletId = result.payload
        expect(result.type).toBe('editentity/deleteEditentity/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().editentity
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
