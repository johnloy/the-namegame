import Advisor from 'autocrat-advisor'

export default class TimerAdvisor extends Advisor {

  get expertise () {
    return {

      starting: {

        start: Advisor.Action(() => {
          if(!this.interval) {
            requestAnimationFrame(() => {
              this.interval = setInterval(this.actions.tick, 1000)
            })
            this.actions.tick()
          }
        }),

        starts: Advisor.Stream

      },

      stopping: {

        stop: Advisor.Action(() => {
          clearInterval(this.interval)
          this.interval = null
        }),

        stops: Advisor.Stream

      },

      resetting: {

        reset: Advisor.Action(() => {
          this.actions.stop()
          return 0
        }),

        resets: Advisor.Stream

      },

      ticking: {

        tick: Advisor.Action(() => {
          const currentTime = this.autocrat.get('view.scoring.timeInSeconds').value() || 0
          return currentTime + 1
        }),

        ticks: Advisor.Stream

      }
    }
  }
}
