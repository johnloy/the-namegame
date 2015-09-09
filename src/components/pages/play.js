import React, { Component, PropTypes } from 'react'
import People from '../people'
import Scoreboard from '../scoreboard'
import reactMixin from 'react-mixin'
import reactKeybinding from 'react-keybinding'

function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className = element.className + ' ' + className;
  }
  return element;
}

function removeClass(element, className) {
  if (hasClass(className)) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = (' ' + element.className + ' ')
      .replace(' ' + className + ' ', ' ').trim();
    }
  }
  return element;
}

function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}

@reactMixin.decorate(reactKeybinding)
export default class PlayPage extends Component {

  static contextTypes = {
    advisors: PropTypes.object.isRequired,
    advise: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    const {advise, advisors: the} = this.context

    this.keybindings = {
      'j': advise(the.app).to('focusPerson', 'below'),
      'k': advise(the.app).to('focusPerson', 'above'),
      'h': advise(the.app).to('focusPerson', 'before'),
      'l': advise(the.app).to('focusPerson', 'after'),
      'enter': advise(the.app).to('choosePerson'),
      'esc': advise(the.app).to('quitPlaying')
    }

  }

  componentWillEnter (done) {
    const el = React.findDOMNode(this)
    setTimeout((() => {
      addClass(el, 'play-page--active')
    }), 17)
    done()
  }

  componentDidMount () {
    if(this.props.isDeepLink) {
      const el = React.findDOMNode(this)
      addClass(el, 'play-page--active')
      addClass(el, 'play-page--deeplink')
    }
  }

  componentWillLeave (done) {
    const el = React.findDOMNode(this)
    setTimeout(() => {
      addClass(el, 'play-page--leaving')
      removeClass(el, 'play-page--active')
      addClass(el, 'play-page--leave')
      setTimeout((() => done()), 400)
    } , 17)
  }

  render () {
    const {advise, advisors: the} = this.context
    require('./play.css')

    return (
      <section className="play-page">
        <a key="quit-btn"
           className="quit-btn fixed block"
           title="Click to quit"
           onClick={ advise(the.app).to('quitPlaying') }><span>Quit</span></a>
        <People />
        <Scoreboard />
      </section>
    )
  }

}
