import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import isFunction from 'lodash.isfunction'
import calculateScore from '../../../lib/calculate-score'

export default class ScoringGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      timeInSeconds: prop('timeInSeconds'),
      isAnswerCorrect: prop('isAnswerCorrect'),
      isAnswerTooSlow: prop('isAnswerTooSlow')
    }}

  }}

  laws (when, the) {

    when.any(the.timer.ticks, the.timer.resets)
      .updateProp('timeInSeconds')

    when(the.app.choosesPerson)
      .advise(the.app).to('calculateScore')

    when(the.app.calculatesScore)
      .advise(the.app).to('givePostAnswerFeedback')
      .advise(the.timer).to('stop')

    when(the.app.givesPostAnswerFeedback)
      .updateProps('isAnswerTooSlow', 'isAnswerCorrect',)

    when(the.people.getsNewSet)
      .updateProps('isAnswerCorrect', 'isAnswerTooSlow')

  }

  updateTimeInSeconds (currVal, e) {
    return e.data
  }

  updateIsAnswerCorrect (currVal, e) {
    if(e.data && 'score' in e.data) {
      return e.data.score > 1 ? true : false
    } else {
      return null
    }
  }

  updateIsAnswerTooSlow (currVal, e) {
    if(e.data && 'score' in e.data) {
      const { score } = e.data
      const val = score > 1 && score < 3 && e.data ? true : false
      return val
    } else {
      return null
    }
  }

}
