import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList'
import Main from './components/Main/Main'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import StoreProvider from './store/StoreProvider'

const App = () => {

  return (
    <Router>
      <StoreProvider>
        <ActiveUsersList />
        <Main />
      </StoreProvider>
    </Router>
  )

}

export default App;