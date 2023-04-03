const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditentityList from '../EditentityList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Editentity rows when api response has data', async () => {
    const endPoint = 'editentity'
    const getEditentityListResponse = [
        {
            id: 1,
            editone: 'editone',
            edittwo: false,
            editthree: 10,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getEditentityListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <EditentityList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const editentityEditoneCell = await screen.findByText(/editone/i)

    expect(editentityEditoneCell).toHaveTextContent(/editone/i)
    mock.reset()
})
