import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row, Col, Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap'

import compose from '../../utils/compose'
import socket from '../../global/socket'
import './Header.styl'

class Header extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    send: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }
  state = {
    nickname: '',
    password: '',
    validate: true
  }
  componentWillMount () {
    const { send, history } = this.props
    socket.on('authentication', user => {
      const { nickname } = this.state
      if (!user) {
        this.setState({ validate: false })
      } else if (user.nickname === nickname) {
        send('SET_PAGE', 'chat')
        send('SET_USER', user)
        history.push('/chat')
      }
    })
  }
  onChangeNickname = ({ target }) => {
    this.setState({
      nickname: target.value
    })
  }
  onChangePassword = ({ target }) => {
    this.setState({
      password: target.value
    })
  }
  clickSignIn = () => {
    const { nickname, password } = this.state
    nickname && password ? socket.emit('authentication', nickname, password) : this.setState({ validate: false })
  }
  clickSignOut = () => {
    const { send, history } = this.props
    send('SET_USER', null)
    send('SET_PAGE', 'home')
    history.push('/')
  }
  render () {
    const { nickname, password, validate } = this.state
    const { page } = this.props

    return (
      <header className='header-wrapper'>
        <Grid>
          <Row className='header'>
            <Col sm={2} xs={12}>
              <h1 className='header__title'>MyChat</h1>
            </Col>
            <Col sm={10} xs={8} className='header_right'>
              {
                page === 'home' &&
                <Form inline className='header__form_login'>
                  <FormGroup controlId='sign_in' validationState={validate ? null : 'error'}>
                    <FormControl
                      type='text'
                      placeholder='Nickname'
                      value={nickname}
                      onChange={this.onChangeNickname}
                    />
                    <FormControl
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={this.onChangePassword}
                    />
                    <HelpBlock className={validate && 'hidden'}>Incorrect nickname or password.</HelpBlock>
                  </FormGroup>
                  <Button bsStyle='primary' onClick={this.clickSignIn}>Sign in</Button>
                </Form>
              }
              {
                page === 'chat' &&
                <Button bsStyle='primary' onClick={this.clickSignOut}>Sign out</Button>
              }
            </Col>
          </Row>
        </Grid>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  send: (type, payload) => {
    dispatch({ type, payload })
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header)
