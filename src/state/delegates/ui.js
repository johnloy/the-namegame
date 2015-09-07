import first from 'lodash.first'

export default function ui (autocrat, state) {
  const governorName = first(Object.keys(state))
  const governor = autocrat.governors[governorName]

  if(state[governorName].showLoading) {
    // Provide the user a little time to prepare for a new set of people
    setTimeout(() => {
      governor.updateShowLoading(state[governorName].showLoading)
    }, 2500)
  }
}
