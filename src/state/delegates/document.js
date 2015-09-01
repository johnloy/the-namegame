export default function document (state) {
  if (typeof document !== 'undefined') {

    const doc = state.reduce((result, governor) => {
      return Object.assign(result, governor)
    }, {})

    if (doc.title) document.title = doc.title

    // if(obj.head) document.head.appendChild(obj.head)
  }
}
