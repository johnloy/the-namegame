import HomePage from '../components/pages/home'
import PlayPage from '../components/pages/play'
import TryPage from '../components/pages/try'
import NotFoundPage from '../components/pages/404'

export const titleBase = 'The Willow Tree Namegame'

export const pages = [

  { name: 'Home',
    route: '/',
    component: HomePage,
    htmlTitle: `${titleBase}` },

  { name: 'Play',
    route: '/play',
    component: PlayPage,
    htmlTitle: `Play — ${titleBase}` },

  { name: 'Try',
    route: [/\/tries\/(\d{1,3})$/, 'tryId'],
    component: TryPage,
    htmlTitle: (props) => `Try #${props.tryId} — ${titleBase}` },

  { name: '404',
    component: NotFoundPage,
    htmlTitle: `Page Not Found — ${titleBase}` }

]
