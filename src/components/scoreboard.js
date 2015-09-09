import React, {Component, PropTypes} from 'react'
import bindToState from './decorators/bind-to-state'
import TransitiveNumber from 'react-transitive-number'

@bindToState()
export default class Scoreboard extends Component {

  render () {
    require('./scoreboard.css')

    return (
      <aside key="scoreboard" className="scoreboard">
        <div className="timer">
          <div className="timer_label">Time:</div>
          <TransitiveNumber>{ this.props.time || 0 }</TransitiveNumber>s
        </div>
        <p className="timer_explanation">
          <i className="icon icon-info" /> If you guess correctly, but after a time greater than 7 seconds, expect to be reviewed later.
        </p>
      </aside>
    )
  }
}
