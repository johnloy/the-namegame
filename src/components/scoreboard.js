import React, {Component, PropTypes} from 'react'
import bindToState from './decorators/bind-to-state'
import classNames from 'classnames'
import TransitiveNumber from 'react-transitive-number'

@bindToState()
export default class Scoreboard extends Component {

  render () {
    require('./scoreboard.css')

    return (
      <ul key="scoreboard" className="scoreboard">
        <li><a href="#"><TransitiveNumber>{ this.props.time || 0 }</TransitiveNumber>s</a></li>
        <li><a href="#">Compose</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Calendar</a></li>
        <li><a href="#">Download</a></li>
      </ul>
    )
  }
}
