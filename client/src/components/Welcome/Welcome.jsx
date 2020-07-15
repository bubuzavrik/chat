import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'

import socket from '../../global/socket'
import compose from '../../utils/compose'
import './Welcome.styl'

class Welcome extends Component {
  static propTypes = {
    send: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }
  state = {
    nickname: '',
    firstname: '',
    lastname: '',
    password: '',
    validate: true
  }
  onChangeNickname = ({ target }) => {
    this.setState({
      nickname: target.value
    })
  }
  onChangeFirstname = ({ target }) => {
    this.setState({
      firstname: target.value
    })
  }
  onChangeLastname = ({ target }) => {
    this.setState({
      lastname: target.value
    })
  }
  onChangePassword = ({ target }) => {
    this.setState({
      password: target.value
    })
  }
  clickCreateAccount = () => {
    const { nickname, firstname, lastname, password } = this.state

    if (nickname && firstname && lastname && password) {
      socket.emit('create account', nickname, firstname, lastname, password)
    } else {
      this.setState({ validate: false })
    }
  }
  componentWillMount () {
    const { send, history } = this.props
    socket.on('create account', user => {
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
  render () {
    const { nickname, firstname, lastname, password, validate } = this.state
    return (
      <Grid fluid className='welcome-wrapper'>
        <Row className='welcome'>
          <Col md={6} xs={12}>
            <h2 className='welcome__title'>Welcome to MyChat</h2>
          </Col>
          <Col mdOffset={1} md={5} smOffset={2} sm={8} xs={12} className='welcome__form'>
            <Form horizontal>
              <h3 className='welcome__form_title'>Create a New Account</h3>
              <Col xs={12}>
                <FormGroup
                  controlId='nickname'
                  validationState={validate ? null : 'error'}
                >
                  <ControlLabel>Nickname:</ControlLabel>
                  <FormControl
                    type='text'
                    placeholder='Pick a nickname'
                    value={nickname}
                    onChange={this.onChangeNickname}
                  />
                </FormGroup>
                <FormGroup
                  controlId='real-name'
                  validationState={validate ? null : 'error'}
                >
                  <ControlLabel>Real name:</ControlLabel>
                  <Row>
                    <Col xs={6}>
                      <FormControl
                        type='text'
                        placeholder='Firstname'
                        value={firstname}
                        onChange={this.onChangeFirstname}
                      />
                    </Col>
                    <Col xs={6}>
                      <FormControl
                        type='text'
                        placeholder='Lastname'
                        value={lastname}
                        onChange={this.onChangeLastname}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup
                  controlId='password'
                  validationState={validate ? null : 'error'}
                >
                  <ControlLabel>Password:</ControlLabel>
                  <FormControl
                    type='password'
                    placeholder='*******'
                    value={password}
                    onChange={this.onChangePassword}
                  />
                  <HelpBlock className={validate && 'hidden'}>This nickname already exists or incorrect input fields.</HelpBlock>
                </FormGroup>
                <FormGroup className='welcome__form_btn'>
                  <Button bsStyle='primary' onClick={this.clickCreateAccount}>Create Account</Button>
                </FormGroup>
              </Col>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  send: (type, payload) => {
    dispatch({ type, payload })
  }
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Welcome)
