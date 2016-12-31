import React from 'react'
import merge from 'lodash/merge'
import moment from 'moment'

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
    let { title, done, remind_date } = reminder
    remind_date = moment(remind_date).format('MM/DD')
    const glyph = done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'
    const toggleButton =
      <Button onClick={this.toggleDone}>
        <span className={glyph} aria-hidden="true"></span>
      </Button>


    const itemTextStatus = done ? 'line-through' : ''

    return (
      <ListGroupItem className="reminder-list-item">
          {toggleButton}
          <span style={{textDecoration: itemTextStatus}} onClick={() => selectReminder(reminder)}>{title} | </span>
          <span>{remind_date}</span>
      </ListGroupItem>
    )
  }
}

export default ReminderListItem
