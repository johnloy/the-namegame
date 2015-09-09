import Advisor from 'autocrat-advisor'
import contains from 'lodash.contains'
import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'
import calculateScore from '../../../lib/calculate-score'

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
          } else if(typeof which === 'number') {
            return which
          }
          return null
        }),
        focusesPerson: Advisor.Stream
      },

      personChoosing: {
        choosePerson: Advisor.Action(() => {
          const id = this.autocrat.get('view.people.currentlyFocused').value()
          return id
        }),
        choosesPerson: Advisor.Stream((baseStream) => {
          return baseStream.filter((e) => {
            return isNumber(e.data)
          })
        })
      },

      scoreCalculating: {
        calculateScore: Advisor.Action(({ triggeringEvents }) => {
          const getState = this.autocrat.get
          const subjectId = getState('view.people.currentSubject').value().id
          const people = getState('db.people.collection').immutable()
          const subject = people.find((p) => p.get('id') === subjectId).toJS()
          const chosenId = triggeringEvents.advisor.data
          const time = getState('view.scoring.timeInSeconds').value()
          const score = calculateScore(subject, chosenId, time)
          return score
        }),
        calculatesScore: Advisor.Stream
      },

      postAnswerFeedback: {
        givePostAnswerFeedback: Advisor.Action(({ triggeringEvents: { advisor: { data: [subject, score] } } }) => {
          return { subject, score }
        }),
        givesPostAnswerFeedback: Advisor.Stream((baseStream) => {
          return baseStream
        }),
        finishesGivingPostAnswerFeedback: Advisor.Stream(() => {
          return (
            this.streams.givesPostAnswerFeedback.bufferWithTime(2000)
              .map(([advisorEvent]) => {
                const people = this.autocrat.get('db.people.collection').value()
                advisorEvent.data = people
                advisorEvent.type = 'app:finishesGivingPostAnswerFeedback'
                return advisorEvent
              })
          )

        })
      }

    }

  }

}
