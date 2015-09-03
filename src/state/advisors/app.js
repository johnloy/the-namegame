import Advisor from 'autocrat-advisor'

export default class AppAdvisor extends Advisor {

  get expertise () {
    return {

      mounting: {
        mount: Advisor.Action,
        mounts: Advisor.Stream
      },

      playing: {
        play: Advisor.Action,
        plays: Advisor.Stream
      },

      quitting: {
        quitPlaying: Advisor.Action,
        quitsPlaying: Advisor.Stream
      }

    }
  }

}
