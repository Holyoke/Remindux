import React from 'react'
import merge from 'lodash/merge'

// components
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Button from 'react-bootstrap/lib/Button'

class ReminderListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { detail: false }
    this.toggleDone = this.toggleDone.bind(this)
    this.toggleDetail = this.toggleDetail.bind(this)
  }

  toggleDetail (e) {
    if (e) e.preventDefault() // to catch nested events
    this.setState({detail: !this.state.detail})
  }

  toggleDone (e) {
    e.preventDefault()
    const { updateReminder, reminder } = this.props
    const toggledReminder = merge({}, reminder, { done: !reminder.done })
    updateReminder(toggledReminder)
  }


  render () {
    const { reminder, selectReminder } = this.props
    const { title, done } = reminder
    const toggleButton = <Button onClick={this.toggleDone}>
                         {done ? 'Undo' : 'Complete'}</Button>
    return (
      <ListGroupItem className="reminder-list-item">
          <h4 onClick={() => selectReminder(reminder)}>Reminder: {title}</h4>
          <section>Done: {done.toString()}</section>
          {toggleButton}
      </ListGroupItem>
    )
  }
}

export default ReminderListItem
