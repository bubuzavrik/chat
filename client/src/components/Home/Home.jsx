import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from '../../utils/compose'
import Header from '../Header/Header.jsx'
import Welcome from '../Welcome/Welcome.jsx'
import Footer from '../Footer/Footer.jsx'

class Home extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }
  componentWillMount () {
    const { page, history } = this.props
    if (page === 'chat') {
      history.push('/chat')
    }
  }
  render () {
    return (
      <Fragment>
        <Header />
        <Welcome />
        <Footer />
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
)(Home)
