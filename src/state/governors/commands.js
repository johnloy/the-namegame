import Governor from 'autocrat-governor'
import constant from 'lodash.constant'

export default class CommandGovernor extends Governor {

  state () { return {

    // view: (prop) => { return {
    //   name: prop('name')
    // }},
    //
    // document: (prop) => { return {
    //   title: prop('title'),
    //   scrollTop: 0
    // }}

  }}

  laws (when, the) {

    when(the.app.plays)
      .advise(the.route).to('change', '/play')

    when(the.app.quitsPlaying)
      .advise(the.route).to('change', '/')
  }

}
