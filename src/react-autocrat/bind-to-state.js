import React, {Component, PropTypes} from 'react'
import Autocrat from 'autocrat'
import getComponentName from '../utils/get-component-name'
import isPlainObject from 'lodash.isplainobject'
import Immutable from 'immutable'
import invoke from 'lodash.invoke'

function wrapRoot (autocrat, bindingsMap, RootComponent) {

  const displayName = getComponentName(RootComponent)

  return class AutocratRootComponent extends Component {
    static wrapped = RootComponent
    static displayName = `AutocratRoot(${displayName})`

    static childContextTypes = {
      autocrat: PropTypes.instanceof(Autocrat).isRequired,
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
        wareds: autocrat.wards,
        advise: this.advise
      }
    }

    advise (autocrat, advisor) {
      return {
        to: (action, data) => advisor.actions[action].bind(advisor, data)
      }
    }

    expandBindingsMap () {
      return

      /*
       People:
         people: ['currentPeople', (person) => ]

      */
    }

    render() {
      return wrappedComponent(RootComponent)
    }

  }

}


function getObserver (component, stateTriggerSpec) {
  let finderFn
  if(stateTriggerSpec.finderFn) finderFn = component::stateTriggerSpec.finderFn

  const observer = component.autocrat.observe('view.' + stateTriggerSpec.address, finderFn)
  const changeHandler = component.updateState.bind(component, stateTriggerSpec.propName)
  const unsubscribe = observer.onChange(changeHandler)

  return { finderFn, unsubscribe, ...observer }
}

function bindStateTrigger (component, initialProps, stateTriggerSpec) {
  const observer = component.observers[stateTriggerSpec.address] = getObserver(component, stateTriggerSpec)
  initialProps[stateTriggerSpec.propName] = observer.initialVal
  return observer
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

function wrapComponent (WrappedComponent) {

  const displayName = getComponentName(WrappedComponent)

  class AutocratComponent extends Component {
    static wrapped = WrappedComponent
    static displayName = `AutocratComponent(${displayName})`

    static contextTypes = {
      autocrat: PropTypes.instanceof(Autocrat).isRequired,
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
        advisors: this.context.advisors,
        advise: this.context.advise,
        wards: this.context.wards
      }

      let [ initialProps, stateObservers ] = this.bindState()
      this.state = {
        props: {
          ...initialProps,
          ...this.autocratProps
        },
        immProps: Immutable.fromJS(initialProps)
      }
      this.stateObservers = stateObservers
    }

    bindState () {
      const { [displayName]: bindingsMap } = this.context.bindingsMap
      const stateTriggerSpecs =  bindingsMap.map(buildStateTriggerSpec)
      let initialProps = {}
      const bindStateTrigger = bindStateTrigger.bind(this, this, initialProps)
      const observers = stateTriggerSpecs.map(bindStateTrigger)
      return [initialProps, observers]
    }

    updateState (propName, immVal) {
      const nextState = computeNextState()
      this.setState({
        props: {
          ...immVal.toObject(),
          ...this.autocratProps
        },
        immProps: this.state.immProps.set(propName, immVal)
      })
    }

    shouldComponentUpdate (nextProps, nextState) {
      return Immutable.is(this.state.immProps, nextState.immProps)
    }

    render () {
      return (
        {/* NOTE: props is an object whose values are all ImmutableJS instances */}
        <WrappedComponent ref='wrappedInstance' {...this.state.props} />
      );
    }

    componentWillUnmount () {
      invoke(this.observers, 'unsubscribe')
    }

  }

}

export default function bindToState (autocrat, bindingsMap) {
  const isRoot = autocrat instanceof Autocrat

  // validate bindings map
  // throw an error if there are not two correct arguments for root

  if(isRoot) {
    return wrapRoot.bind(null, autocrat, bindingsMap)
  } else {
    return wrapComponent
  }
}
