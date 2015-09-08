import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import isFunction from 'lodash.isfunction'

export default class ScoringGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      timeInSeconds: prop('timeInSeconds')
    }},

  }}

  laws (when, the) {

    when.any(the.timer.ticks, the.timer.resets)
      .updateProp('timeInSeconds')

  }

  updateTimeInSeconds (currVal, e) {
    return e.data
  }

}
