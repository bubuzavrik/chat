import React from 'react'
import { Grid, Row } from 'react-bootstrap'
import './Footer.styl'

export default function Header () {
  const dateNow = new Date()

  return (
    <footer className='footer'>
      <Grid >
        <Row>
          <p className='footer__copyright'>© {dateNow.getFullYear()} <b>MyChat</b></p>
        </Row>
      </Grid>
    </footer>
  )
}
