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
    require('./governors/people')
  ],

  delegates: [
    require('./delegates/navigate'),
    require('./delegates/document'),
  ]

  // stateMachine: require('./state-machine')

})
