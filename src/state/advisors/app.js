import Advisor from 'autocrat-advisor'

export default class AppAdvisor extends Advisor {

  get expertise () {
    return {

      mounting: {
        mount: Advisor.Action,
        mounts: Advisor.Stream
      }

    }
  }

}
