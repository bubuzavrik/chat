import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import compose from '../../utils/compose'
import Header from '../Header/Header.jsx'
import ChatArea from '../ChatArea/ChatArea.jsx'

class Chat extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }
  componentWillMount () {
    const { page, history } = this.props
    if (page === 'home') {
      history.push('/')
    }
  }
  render () {
    return (
      <Fragment>
        <Header />
        <ChatArea />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  page: state.page
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Chat)
