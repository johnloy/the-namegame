// All addresses are relative to (@root)view.
export default {

  App: {
    page: 'page',
    route: 'route'
  },

  People: {
    showLoading: 'people.showLoading',
    people: 'people.currentSet',
    currentlyFocused: 'people.currentlyFocused',
    resultOverlayImage: 'resultOverlayImage',
    mattLastName: 'input.mattLastName',
    currentPerson: 'currentPerson'
  },

  Scoreboard: {
    time: 'scoring.timeInSeconds', // e.g. [h, m, s, ms]
    bestTime: 'bestTime',
    worstTime: 'worstTime',
    avgTime: 'avtTime',
    seenPeopleCount: 'seenPeopleCount',
    crushedItCount: 'crushedItCount',
    needsReviewCount: 'needsReviewCount',
    triesScores: 'triesScores'
  }

}
