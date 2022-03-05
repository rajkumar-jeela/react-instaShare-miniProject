import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFound from './components/NotFound'
import './App.css'
import UsersProfileRoute from './components/UsersProfileRoute'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
      <ProtectedRoute
        exact
        path="/users/:userId"
        component={UsersProfileRoute}
      />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
