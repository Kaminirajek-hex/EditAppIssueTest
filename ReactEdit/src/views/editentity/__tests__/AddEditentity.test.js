const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddEditentity from '../AddEditentity'

beforeEach(() => {
    const endPoint = 'editentity'
    const getStudentListResponse = [
        {
            id: 1,
            editone: 'editone',
            edittwo: false,
            editthree: 45,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddEditentity />
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

describe('testing view EditentityAdd Component', () => {
    test('should render AddEditentity and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addEditentityButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const editoneElement = screen.getByLabelText(/Editone/i)
        const edittwoElement = screen.getByLabelText(/Edittwo/i)
        const editthreeElement = screen.getByLabelText(/Editthree/i)

        expect(addEditentityButtonElement).toBeInTheDocument()

        expect(editoneElement).toBeInTheDocument()
        expect(edittwoElement).toBeInTheDocument()
        expect(editthreeElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Editentity add form', async () => {
        const editoneElement = screen.getByLabelText(/Editone/i)
        const edittwoElement = screen.getByLabelText(/Edittwo/i)
        const editthreeElement = screen.getByLabelText(/Editthree/i)

        fireEvent.change(editoneElement, { target: { value: 'editone' } })
        fireEvent.change(editthreeElement, { target: { value: 55 } })

        fireEvent.mouseDown(edittwoElement)
        const edittwolistbox = within(screen.getByRole('listbox'))
        fireEvent.click(edittwolistbox.getByText(/False/))
        expect(edittwoElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Editentity button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addEditentityButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addEditentityButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
