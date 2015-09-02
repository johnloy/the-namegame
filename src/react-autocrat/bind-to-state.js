import React, {Component, PropTypes} from 'react'
import Autocrat from 'autocrat'
import getComponentName from '../utils/get-component-name'
import isPlainObject from 'lodash.isplainobject'
import Immutable from 'immutable'
import invoke from 'lodash.invoke'
import map from 'lodash.map'
import omit from 'lodash.omit'
import isEmpty from 'lodash.isempty'

function getObserver (component, stateTriggerSpec) {
  let finderFn
  if(stateTriggerSpec.finderFn) finderFn = component::stateTriggerSpec.finderFn

  const observer = component.autocrat.observe('view.' + stateTriggerSpec.address, finderFn)
  const changeHandler = component.updateState.bind(component, stateTriggerSpec.propName)
  const unsubscribe = observer.onChange(changeHandler)

  return { finderFn, unsubscribe, ...observer }
}

function buildStateTriggerSpec (asDefined, idx) {
  let finderFn
  if(Array.isArray(asDefined)) {
    finderFn = asDefined[1]
    asDefined = asDefined[0]
  }
  let address = asDefined
  let spec = asDefined.split('.')
  spec.address = address
  spec.finderFn = finderFn
  if(typeof idx === 'string') spec.propName = idx
  return spec
}

function bindStateTrigger (component, initialProps, stateTriggerSpec) {
  const observer = getObserver(component, stateTriggerSpec)
  initialProps[stateTriggerSpec.propName] = observer.initialVal
  return observer
}

function wrapRoot (autocrat, bindingsMap, RootComponent) {

  const displayName = getComponentName(RootComponent)

  return class AutocratRootComponent extends Component {
    static wrapped = RootComponent
    static displayName = `AutocratRoot(${displayName})`

    static childContextTypes = {
      autocrat: PropTypes.instanceOf(Autocrat).isRequired,
      bindingsMap: PropTypes.object.isRequired,
      getState: PropTypes.func.isRequired,
      advisors: PropTypes.object.isRequired,
      wards: PropTypes.object.isRequired,
      advise: PropTypes.func.isRequired
    }

    getChildContext () {
      return {
        autocrat,
        bindingsMap,
        getState: autocrat.get,
        advisors: autocrat.advisors,
        wards: autocrat.wards,
        advise: this.advise
      }
    }

    advise (advisor) {
      return {
        to: (action, ...data) => advisor.actions[action].bind(advisor, ...data)
      }
    }

    render() {
      return React.createElement(wrapComponent(RootComponent))
    }

  }

}

function wrapComponent (WrappedComponent) {

  const displayName = getComponentName(WrappedComponent)

  return class AutocratComponent extends Component {
    static wrapped = WrappedComponent
    static displayName = `AutocratComponent(${displayName})`

    static contextTypes = {
      autocrat: PropTypes.instanceOf(Autocrat).isRequired,
      bindingsMap: PropTypes.object.isRequired,
      getState: PropTypes.func.isRequired,
      advisors: PropTypes.object.isRequired,
      wards: PropTypes.object.isRequired,
      advise: PropTypes.func.isRequired
    }

    constructor (props, context) {
      super(props, context)

      this.autocrat = context.autocrat

      this.autocratProps = {
        autocrat: this.context.autocrat,
        advisors: this.context.advisors,
        advise: this.context.advise,
        wards: this.context.wards
      }

      let [ initialProps, stateObservers ] = this.bindState()
      const immProps = Immutable.fromJS(omit(initialProps, isEmpty))
      this.state = {
        props: {
          ...initialProps,
          ...this.autocratProps
        },
        immProps: immProps
      }
      this.immProps = immProps
      this.stateObservers = stateObservers
    }

    bindState () {
      const { [displayName]: bindingsMap } = this.context.bindingsMap
      const stateTriggerSpecs = map(bindingsMap, buildStateTriggerSpec)
      let initialProps = {}
      bindStateTrigger = bindStateTrigger.bind(this, this, initialProps)
      const observers = map(stateTriggerSpecs, bindStateTrigger)
      return [initialProps, observers]
    }

    updateState (propName, immVal) {
      const immValAddress = immVal.get('address').split('.').slice(1)
      const newImmProps = this.immProps.setIn(immValAddress, immVal.get('val'))
      this.immProps = newImmProps
      this.setState({
        props: {
          ...newImmProps.toObject(),
          ...this.autocratProps
        },
        immProps: newImmProps
      })
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !(Immutable.is(this.state.immProps, nextState.immProps))
    }

    render () {
      // NOTE: props is an object whose values are nearly all ImmutableJS instances
      const { props } = this.state
      return (
        <WrappedComponent ref="wrappedInstance" { ...props } />
      )
    }

    componentWillUnmount () {
      invoke(this.stateObservers, 'unsubscribe')
    }

  }

}

export default function bindToState (autocrat, bindingsMap) {
  const isRoot = autocrat instanceof Autocrat

  // TODO: Validate bindings map
  // TODO: throw an error if there are not two correct arguments for root

  if(isRoot) {
    return wrapRoot.bind(null, autocrat, bindingsMap)
  } else {
    return wrapComponent
  }
}
