import React, {Component, PropTypes} from 'react'
import bindToState from './decorators/bind-to-state'
import range from 'lodash.range'
import Spinner from 'react-spinkit'
import classNames from 'classnames'

@bindToState()
export default class People extends Component {

  photoOverlay (isFocused, isAnswerCorrect, isAnswerTooSlow) {
    if(isFocused && isAnswerCorrect !== null) {
      const classes = classNames(
        'person_overlay',
        { 'person_overlay--correct': isAnswerCorrect && !isAnswerTooSlow,
          'person_overlay--incorrect': !isAnswerCorrect,
          'person_overlay--too-slow': isAnswerTooSlow }
      )
      const correctMsg = <p className="flex flex-center"><i className="icon icon-thumbsup" /> Well done!</p>
      const incorrectMsg = <p className="flex flex-center"><i className="icon icon-thumbsdown" /> Nope!</p>
      const tooSlowMsg = <p className="flex flex-center"><i className="icon icon-clock" /> Yes, but a little slow!</p>

      const message = () => {
        if(!isAnswerCorrect) {
          return incorrectMsg
        } else if(isAnswerTooSlow) {
          return tooSlowMsg
        } else {
          return correctMsg
        }
      }

      return (
        <div className={ classes }>
          { message() }
        </div>
      )
    }
  }

  people () {
    const { people, currentlyFocused, isAnswerCorrect, isAnswerTooSlow } = this.props
    if(people && people.length) {
      return (
        people.map((person) => {
          const isFocused = Boolean(currentlyFocused && currentlyFocused === person.get('id'))
          const isCorrect = isAnswerCorrect && !isAnswerTooSlow
          const classes = classNames(
            'person',
            { 'person--selected': isFocused,
              'person--not-selected': currentlyFocused && !isFocused,
              'person--correct': isFocused && isCorrect,
              'person--incorrect': isFocused && isCorrect === false,
              'person--too-slow': isFocused && isAnswerTooSlow }
          )
          return (
            <li className={ classes }>
              <img src={person.get('photo')} />
              { this.photoOverlay(isFocused, isAnswerCorrect, isAnswerTooSlow) }
            </li>
          )
        })
      )
    } else {
      return (
        range(6).map(() => {
          <li className="person"><img src="" /></li>
        })
      )
    }
  }

  spinner () {
    if(this.props.showLoading) {
      return (
        <div className="people-viewport_spinner flex flex-center">
          <Spinner spinnerName="pulse" noFadeIn />
        </div>
      )
    }
  }

  render () {
    require('./people.css')
    const { currentSubject, showLoading } = this.props
    const currentSubjectName = currentSubject && currentSubject.get('name')

    const questionClassNames = classNames(
      'question',
      { 'question--active': showLoading === false }
    )


    return (
      <div className="people-viewport">
        { this.spinner() }
        <div className="people-viewport_crop flex flex-center">
          <ul key="people" className="people flex flex-wrap">
            { this.people() }
          </ul>
        </div>
        <div className={ questionClassNames }>
          Who is { currentSubjectName }?
        </div>
      </div>
    )
  }
}
