import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import isFunction from 'lodash.isfunction'
import calculateScore from '../../../lib/calculate-score'

export default class ScoringGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      timeInSeconds: prop('timeInSeconds')
    }},

    db: (prop) => { return {
      scoreForPerson: prop('scoreForPerson')
    }}

  }}

  laws (when, the) {

    when.any(the.timer.ticks, the.timer.resets)
      .updateProp('timeInSeconds')

    when(the.app.choosesPerson)
      .updateProp('scoreForPerson')

  }

  updateTimeInSeconds (currVal, e) {
    return e.data
  }

  updateScoreForPerson (currVal, e) {
    const getState = this.autocrat.get
    const subject = getState('view.people.currentSubject').value()
    const chosenId = e.data
    const time = getState('view.scoring.timeInSeconds').value()
    // [subject, score]
    return calculateScore(subject, chosenId, time)
  }

}
