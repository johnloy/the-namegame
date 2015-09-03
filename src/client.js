import 'babel/polyfill'
import React, { Component, PropTypes } from 'react'
import App from './components/app'
import queryString from 'query-string'

React.render(<App />, document.getElementById('content'))
