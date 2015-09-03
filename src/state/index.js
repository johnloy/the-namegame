import Autocrat from 'autocrat'

export default Autocrat.define({

  constitution: [
    require('autocrat-state-machine')
  ],

  advisors: [
    require('./advisors/app'),
    require('./advisors/route'),
    require('./advisors/people'),
    require('./advisors/page')
  ],

  governors: [
    require('./governors/route'),
    require('./governors/page'),
    require('./governors/people'),
    require('./governors/commands')
  ],

  delegates: [
    require('./delegates/navigate'),
    require('./delegates/document'),
    require('./delegates/db')
  ]

  // stateMachine: require('./state-machine')

})
