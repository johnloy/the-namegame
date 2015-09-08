import React, {Component, PropTypes} from 'react'
import bindToState from './decorators/bind-to-state'
import range from 'lodash.range'
import Spinner from 'react-spinkit'
import classNames from 'classnames'

@bindToState()
export default class People extends Component {

  people () {
    const { people, currentlyFocused } = this.props
    if(people && people.length) {
      return (
        people.map((person) => {
          const classes = classNames(
            'person',
            { 'person--selected': currentlyFocused && currentlyFocused === person.get('id') }
          )
          return <li className={ classes }><img src={person.get('photo')} /></li>
        })
      )
    } else {
      return (
        range(6).map(() => {
          <li className="person"><img src="http://willowtreeapps.com/wp-content/uploads/2014/12/headshot_andrew_harris1.jpg" /></li>
        })
      )
    }
  }

  spinner () {
    if(this.props.showLoading) {
      return (
        <div className="people-viewport_spinner flex flex-center">
          <Spinner spinnerName="cube-grid"/>
        </div>
      )
    }
  }

  render () {
    require('./people.css')

    return (
      <div className="people-viewport flex flex-center">
        { this.spinner() }
        <ul key="people" className="people flex flex-wrap">
          { this.people() }
        </ul>
        <div className="question">
        Who is Matt Dawson?
        </div>
      </div>
    )
  }
}
