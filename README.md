# WillowTree Apps Namegame

![Screenshot](http://i.imgur.com/ldglX33.png)


Some Highlights
---------------

* Notables in the stack: [Webpack](webpack.github.io), [ES2015](https://babeljs.io/docs/learn-es2015/), [Babel](https://babeljs.io/), [React](http://facebook.github.io/react/), [Bacon](http://baconjs.github.io/), [Autocrat](https://github.com/AutocratJS/autocrat), [superagent](https://visionmedia.github.io/superagent/), [cssnext](http://cssnext.io/), and [surge.sh](http://surge.sh)

* React integration, via [the use of ES7 decorators](https://github.com/johnloy/wat-namegame/blob/master/src/components/decorators/bind-to-state.js), with [Autocrat](https://github.com/AutocratJS/autocrat), a state management tool I wrote to achieve a singular global state representation. It's something like [Redux](http://rackt.github.io/redux/), but was written before the advent of Redux. It [uses Bacon FRP event streams](https://github.com/johnloy/wat-namegame/blob/master/src/state/advisors/page.js#L22-L31) as a primitive for shuttling state information. This integration supports [a very simple and declarative expression](https://github.com/johnloy/wat-namegame/blob/master/src/state/component-bindings.js) of bindings between global state and React.

* A [minimal home-baked routing solution](https://github.com/johnloy/wat-namegame/blob/master/src/components/app.js#L16-L30) (there are only two routes).

* [An algorithm](https://github.com/johnloy/wat-namegame/blob/master/lib/select-people.js) to randomly select photos for each round giving preference to ones in greater need of review, i.e. un/lesser-seen ones and ones which took > 7 seconds to correctly guess.

* Vim keybindings (`h`, `j`, `k`, `l`) to move among the photo grid. Hit `Enter` to choose the currently focused photo.
