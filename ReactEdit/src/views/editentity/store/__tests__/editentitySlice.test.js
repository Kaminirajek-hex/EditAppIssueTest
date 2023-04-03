import store from 'store/store'
import {
    editentityAdded,
    editentityDeleted,
    editentityUpdated,
} from '../editentitySlice'

describe('testing editentity redux store reducers', () => {
    test('add editentity to store test', () => {
        let state = store.getState().editentity
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            editone: 'editone',
            edittwo: false,
            editthree: 10,
        }
        store.dispatch(editentityAdded(initialInput))
        state = store.getState().editentity
        expect(state.entities).toHaveLength(1)
    })

    test('update editentity from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            editone: 'editone',
            edittwo: true,
            editthree: 19,
        }
        store.dispatch(editentityAdded(initialInput))
        let state = store.getState().editentity
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            editone: 'editone',
            edittwo: true,
            editthree: 100,
        }
        store.dispatch(editentityUpdated(updatedInput))
        state = store.getState().editentity
        let changedEditentity = state.entities.find((p) => p.id === 2)
        expect(changedEditentity).toStrictEqual(updatedInput)
    })

    test('delete editentity from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            editone: 'editone',
            edittwo: false,
            editthree: 68,
        }
        store.dispatch(editentityAdded(initialInput))
        let state = store.getState().editentity
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            editentityDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().editentity
        expect(state.entities).toHaveLength(2)
    })
})
