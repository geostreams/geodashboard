// @flow
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'

import page from './page'

export const history = createBrowserHistory()

export default {
    router: connectRouter(history),
    page
}
