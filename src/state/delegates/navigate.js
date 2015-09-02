export default function navigate (autocrat, state) {
  const { route: { path } } =  state
  if (path !== window.location.pathname) {
    window.history.pushState({}, '', path)
  }
}
