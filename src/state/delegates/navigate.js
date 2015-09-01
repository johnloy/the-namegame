export default function navigate (url, autocrat) {
  if (url !== window.location.pathname) {
    window.history.pushState({}, '', url)
  }
}
