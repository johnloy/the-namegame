import Advisor from 'autocrat-advisor'
import ApiClient from '../../../lib/api-client'
import Bacon from 'baconjs'
import selectPeople from '../../../lib/select-people'
import initializePeople from '../../../lib/initialize-people'

const requests = {}

function onFetchSuccess (requestId, data) {
  requests[requestId].successHandler(data)
}

function onFetchResponse (requestId) {
  requests[requestId] = {}
  const req = requests[requestId]

  return {
    then: (successHandler) => req.successHandler = successHandler
  }
}

export default class PeopleAdvisor extends Advisor {

  initialize () {
    this.endpoint = new ApiClient()
  }

  get expertise () {
    return {

      fetching: {

        fetch: Advisor.Action((triggeringEvent) => {
          const promise = this.endpoint.get('/')
          promise.then(onFetchSuccess.bind(this, 'collection'))
          // this.requests['allPeople'] registerRequest('collection', promise)
          // return this.requests['allPeople'] = this.endpoint.get('/')
          return promise
        }),

        fetches: Advisor.Stream,

        haveFetched: Advisor.Stream(() => {
          var stream = new Bacon.Bus(),
              advisorName = this.name

          onFetchResponse('collection').then((data, e) => {
            delete requests['collection']
            var eventData = {
              collection: data,
              triggeringEvent: e
            }
            stream.push(new Advisor.Event(advisorName, 'fetched', eventData))
          })

          return stream
        }),

        areFetching: Advisor.Stream((baseStream) => {
          const advisorName = this.name
          return (
            this.streams.fetches.awaiting(this.streams.haveFetched)
              .map((stillWaiting) => {
                return new Advisor.Event(advisorName, 'areFetching', stillWaiting)
              })
          )
        })

      },

      newSetSelecting: {

        selectNewSet: Advisor.Action((...args) => {
          let people
          const currentSet = this.autocrat.get('view.people.currentSet').value()
          if('triggeringEvents' in args[0]) {
            const triggeringEvents = args[0].triggeringEvents
            if(Array.isArray(triggeringEvents.advisor)) {
              people = initializePeople(triggeringEvents.advisor[0].data.collection)
              return selectPeople(people)
            } else if(triggeringEvents.advisor.type === 'page:changeTo') {
              people = this.autocrat.get('db.people.collection').value()
              if(people && currentSet && !currentSet.length) return selectPeople(people)
            } else if(triggeringEvents.advisor.type === 'app:finishesGivingPostAnswerFeedback') {
              people = triggeringEvents.advisor.data
              return selectPeople(people)
            }
          } else {
            people = args
            if(people && currentSet && !currentSet.length) return selectPeople(people)
          }
        }),

        getsNewSet: Advisor.Stream

      },

      setClearing: {
        clearSet: Advisor.Action,
        clearsItsSet: Advisor.Stream
      },

      loadStarting: {
        startLoading: Advisor.Action(() => {
          setTimeout(this.actions.stopLoading , 3000)
        }),
        startsLoading: Advisor.Stream
      },

      loadStopping: {
        stopLoading: Advisor.Action,
        stopsLoading: Advisor.Stream
      }
    }

  }

}
