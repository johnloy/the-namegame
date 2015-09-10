# WillowTree Apps Namegame

![Screenshot](http://i.imgur.com/ldglX33.png)


Some Highlights
---------------

* Notables in the stack: [Webpack](webpack.github.io), [ES2015](https://babeljs.io/docs/learn-es2015/), [Babel](https://babeljs.io/), [React](http://facebook.github.io/react/), [Bacon](http://baconjs.github.io/), [Autocrat](https://github.com/AutocratJS/autocrat), [superagent](https://visionmedia.github.io/superagent/), [cssnext](http://cssnext.io/), and [surge.sh](http://surge.sh)

* React integration, via [the use of ES7 decorators](https://github.com/johnloy/wat-namegame/blob/master/src/components/app.js#L13) and [higher-order React components](https://github.com/johnloy/wat-namegame/blob/master/src/components/decorators/bind-to-state.js), with [Autocrat](https://github.com/AutocratJS/autocrat), a state management tool I wrote to achieve a singular global state representation. It's something like [Redux](http://rackt.github.io/redux/), but was written before the advent of Redux. It [uses Bacon FRP event streams](https://github.com/johnloy/wat-namegame/blob/master/src/state/advisors/page.js#L22-L31) as a primitive for shuttling state information. This integration supports [a very simple and declarative expression](https://github.com/johnloy/wat-namegame/blob/master/src/state/component-bindings.js) of bindings between global state and React.

* A [minimal home-baked routing solution](https://github.com/johnloy/wat-namegame/blob/master/src/components/app.js#L16-L30) (there are only two routes).

* [An algorithm](https://github.com/johnloy/wat-namegame/blob/master/lib/select-people.js) to randomly select photos for each round giving preference to ones in greater need of review, i.e. un/lesser-seen ones and ones which took > 7 seconds to correctly guess.

* Vim keybindings (`h`, `j`, `k`, `l`) to move among the photo grid. Hit `Enter` to choose the currently focused photo.

Unfortunately...
----------------

* As with any piece of software, there are bugs. Kudos if you find them :)

* There is a ton of code cleanup I would do under ideal circumstances. Alas, this is timeboxed, so here it is, warts and all.

* There aren't jsdoc comments or tests, though I value these things highly. I've used qunit, jasmine, and mocha in the past (and Rspec and Cucumber in my Ruby days, and Midje in my recent Clojure excursions), so I have plenty of experience writing tests and would normally do so. I intentionally chose to omit them in this case to leave more time for feature development.
 
* Cross-browser compatibility and responsive and mobile concerns necessarily played second fiddle to features and infrastructure/tooling. I wanted to cross the finish line, and these aspects can be very time-intensive, as I'm sure you're aware!
