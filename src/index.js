import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
// import { fetchUsers } from './features/users/usersSlice'
import { Provider } from 'react-redux'

import { worker } from './api/server'

import { extendedApiSlice } from './features/users/usersSlice'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // toolkit implementation
  // store.dispatch(fetchUsers())

  // RTKQ implementation
  // If we want to fetch the list of users outside of React, we can dispatch the getUsers.initiate() thunk in our index file:
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
  // Manually dispatching an RTKQ request thunk will create a subscription entry, but it's then up to us unsubscribe from that data later
  // otherwise the data stays in the cache permanently. In this case, we always need user data, so we can skip unsubscribing.
  // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks#removing-a-subscription

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
