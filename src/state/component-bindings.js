import {PropTypes} from 'react'

const {
  string, array, bool, func, number, object, node,
  element, oneOf, oneOfType, arrayOf, objectOf, shape
} = PropTypes

export const default {

  App: {
    page: object,
    route: object,
  },

  People: {
    people: [ 'currentPeople' , array ],
    selectedPerson: object,
    resultOverlayImage: string,
    mattLastName: [ 'input.mattLastName', string ],
    currentPerson: object
  },

  Scoreboard: {
    timer: array, // e.g. [h, m, s, ms]
    bestTime: string,
    worstTime: string,
    avgTime: string,
    seenPeopleCount: number,
    crushedItCount: number,
    needsReviewCount: number,
    triesScores: arrayOf(number)
  }

}
