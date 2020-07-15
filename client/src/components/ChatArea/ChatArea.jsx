import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap'

import socket from '../../global/socket'
import './ChatArea.styl'

class ChatArea extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  state = {
    messages: [],
    myMessage: '',
    readMessageId: null
  }
  constructor () {
    super()
    this.nodeListMessages = null
  }
  componentDidMount () {
    socket.on('message', msg => {
      this.setState(prevState => ({ messages: [...prevState.messages, msg] }))
    })
    socket.on('connect user', msg => {
      this.setState(prevState => ({ messages: [...prevState.messages, msg] }))
    })
    socket.on('read message', readMessageId => {
      // eslint-disable-next-line no-debugger
      debugger
      this.setState({ readMessageId })
    })
  }
  componentDidUpdate () {
    if (this.nodeListMessages) {
      const nodeListMessages = ReactDOM.findDOMNode(this.nodeListMessages)
      nodeListMessages.scrollTo(0, nodeListMessages.scrollHeight)
    }
  }
  componentWillUnmount () {
    const { user } = this.props
    socket.emit('disconnected user', user)
  }
  onChangeMessage = ({ target }) => {
    this.setState({ myMessage: target.value })
  }
  sendMessage = () => {
    const { user } = this.props
    const myMessage = this.state.myMessage.replace(/^\s+|\s+$/gm, '')
    myMessage && socket.emit('message', myMessage, user)
    this.setState({ myMessage: '' })
  }
  handlePressEnter = ({ shiftKey, key }) => {
    if (shiftKey && key === 'Enter') {
      this.sendMessage()
    }
  }
  handleFocus = () => {
    const { user } = this.props
    const { messages, readMessageId } = this.state
    const readMessageIndex = readMessageId && messages.findIndex(({ id }) => id === readMessageId)
    const lastMessageReverseIndex = messages.length > 0
      ? [...messages].reverse().findIndex(message => message.text && message.user._id !== user._id)
      : -1
    const lastMessageIndex = ~lastMessageReverseIndex ? messages.length - lastMessageReverseIndex - 1 : -1
    // eslint-disable-next-line no-debugger
    debugger

    if (~lastMessageIndex && (!readMessageId || lastMessageIndex > readMessageIndex)) {
      socket.emit('read message', messages[lastMessageIndex].id)
    }
  }
  render () {
    const { messages, myMessage, readMessageId } = this.state
    const { user } = this.props
    const readMessageIndex = readMessageId && messages.findIndex(({ id }) => id === readMessageId)

    return (
      <Grid className='chat'>
        <Row className='message' ref={node => { this.nodeListMessages = node }}>
          {
            messages.map((item, index) => (
              item.text
                ? <Row key={index} className='message-body'>
                  <Col sm={12} className={'message-main-' + (item.user._id === user._id ? 'sender' : 'receiver')}>
                    <div className={item.user._id === user._id ? 'sender' : 'receiver'}>
                      <span className={'message-user message-user' + (item.user._id === user._id ? '_right' : '_left')}>
                        {item.user.nickname}
                        {' '}
                        {item.user._id === user._id && (readMessageId && index <= readMessageIndex ? '**' : '*')}
                      </span>
                      <pre className='message-text'>
                        {item.text}
                      </pre>
                    </div>
                  </Col>
                </Row>
                : <Row key={index} className='message-previous'>
                  <Col sm={12} className='previous'>
                    <span>
                      {`${item.user.nickname}(${item.user.firstname} ${item.user.lastname}) ${item.connect ? 'joined the chat' : 'was disconnected from the chat'}`}
                    </span>
                  </Col>
                </Row>
            ))
          }
        </Row>
        <Row className='reply'>
          <Col sm={11} xs={11} className='reply-main'>
            <FormGroup controlId='my-message'>
              <FormControl
                componentClass='textarea'
                placeholder='Message...'
                className='form-control'
                rows={2}
                value={myMessage}
                onChange={this.onChangeMessage}
                onKeyUp={this.handlePressEnter}
                onClick={this.handleFocus}
              />
            </FormGroup>
          </Col>
          <Col sm={1} xs={1} className='reply-send'>
            <i className='fa fa-send fa-2x' aria-hidden='true' onClick={this.sendMessage} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ChatArea)
