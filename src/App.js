import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './components/HomePage'

import LoginPage from './components/LoginPage'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </BrowserRouter>
)

export default App
