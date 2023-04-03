const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditEditentity from '../EditEditentity'
import { editentityAdded } from '../store/editentitySlice'
beforeAll(() => {
    store.dispatch(
        editentityAdded({
            id: 1,
            editone: 'editone',
            edittwo: false,
            editthree: 12,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="editentity/edit/1" replace />
                                }
                            />
                            <Route
                                path="editentity/edit/:id"
                                element={<EditEditentity />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of EditentityEdit Component', () => {
    test('should render EditEditentity and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveEditentityButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const editoneElement = screen.getByLabelText(/Editone/i)
        const edittwoElement = screen.getByLabelText(/Edittwo/i)
        const editthreeElement = screen.getByLabelText(/Editthree/i)

        expect(saveEditentityButtonElement).toBeInTheDocument()

        expect(editoneElement).toBeInTheDocument()
        expect(edittwoElement).toBeInTheDocument()
        expect(editthreeElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Editentity edit form', async () => {
        const editoneElement = screen.getByLabelText(/Editone/i)
        const edittwoElement = screen.getByLabelText(/Edittwo/i)
        const editthreeElement = screen.getByLabelText(/Editthree/i)

        fireEvent.change(editoneElement, { target: { value: 'editone' } })
        fireEvent.change(editthreeElement, { target: { value: 95 } })

        expect(editoneElement.value).toBe('editone')

        expect(editthreeElement.value).toBe(95)

        fireEvent.mouseDown(edittwoElement)
        const edittwolistbox = within(screen.getByRole('listbox'))
        fireEvent.click(edittwolistbox.getByText(/True/))
        expect(edittwoElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const editoneElement = screen.getByLabelText(/Editone/i)
        const editthreeElement = screen.getByLabelText(/Editthree/i)

        fireEvent.change(editoneElement, { target: { value: '' } })
        fireEvent.change(editthreeElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveEditentityButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveEditentityButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
