import React from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRedirect, Route, hashHistory } from 'react-router'

// components
import App from './App'
import SessionFormContainer from './session_form_container'
import ReminderListContainer from './reminder_list/reminder_list_container'
import ListsListContainer from './lists/lists_list_container'
import GreetingContainer from './greeting/greeting_container'

const Root = ({store}) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const {currentUser} = store.getState().session
    if (!currentUser) { replace('/greeting') }
  }

  const _redirectIfLoggedIn = (nextState, replace) => {
    const {currentUser} = store.getState().session
    if (currentUser) { replace('/lists') }
  }

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/reminders" />
          <Route path="signup" component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
          <Route path="login" component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
          <Route path="reminders" component={ReminderListContainer} onEnter={_ensureLoggedIn} />
          <Route path="lists" component={ListsListContainer} onEnter={_ensureLoggedIn} />
          <Route path="greeting" component={GreetingContainer} onEnter={_redirectIfLoggedIn} />
        </Route>
      </Router>
    </Provider>
  )
}

export default Root
