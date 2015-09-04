import Governor from 'autocrat-governor'
import constant from 'lodash.constant'

export default class CommandGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      name: prop('name')
    }}

  }}

  laws (when, the) {

    when(the.app.plays)
      .advise(the.route).to('change', '/play')

    when(the.app.quitsPlaying)
      .advise(the.route).to('change', '/')
  }

}
