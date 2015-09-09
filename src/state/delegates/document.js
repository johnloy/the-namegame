import reduce from 'lodash.reduce'

export default function document (autocrat, state) {
  const document = window.document

  if (typeof document !== 'undefined') {
    const doc = reduce(state, (result, governor) => {
      return Object.assign(result, governor)
    }, {})

    if (doc.title) document.title = doc.title
  }
}
