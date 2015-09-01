import 'babel/polyfill'
import React, {Component, PropTypes} from 'react'
import App from './components/app'

import queryString from 'query-string'
import ApiClient from './api-client'
const client = new ApiClient()

React.render(<App />, document.getElementById('content'))
