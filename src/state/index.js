import Autocrat from'autocrat')

module.exports = Autocrat.define({

  constitution: [
    require('autocrat-state-machine')
  ],

  advisors: [
    require('./advisors/route')
  ],

  governors: [
    require('./governors/route'),
    require('./governors/page'),
    require('./governors/persistence')
  ],

  delegates: [
    require('./delegates/navigate'),
    require('./delegates/document'),
  ],

  stateMachine: require('./state-machine')

})
