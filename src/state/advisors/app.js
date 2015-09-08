import Advisor from 'autocrat-advisor'
import contains from 'lodash.contains'
import isString from 'lodash.isstring'

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
      },

      personFocusing: {
        focusPerson: Advisor.Action((which) => {
          let currentlyFocused = this.autocrat.get('view.people.currentlyFocused').value()
          const currentSet = this.autocrat.get('view.people.currentSet').immutable()

          if(contains(['above', 'below', 'after', 'before'], which)) {
            if(!currentlyFocused && contains(['above', 'below'], which)) {
              return (
                which === 'above' ? currentSet.getIn([1, 'id']) : currentSet.getIn([4, 'id'])
              )
            } else if(currentlyFocused) {
              const currentlyFocusedObj = currentSet.find((p) => p.get('id') === currentlyFocused)
              return currentlyFocusedObj.get('neighbors').toObject()[which]
            }
          }
          return which
        }),
        focusesPerson: Advisor.Stream
      },

      personChoosing: {
        choosePerson: Advisor.Action(() => {
        }),
        choosesPerson: Advisor.Stream
      }

    }
  }

}
