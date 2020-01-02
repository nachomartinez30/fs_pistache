import React from 'react'
import logo_cnf from '../assets/img/conafor-blanco-v.png'

const Footer = () => {
  return (
    <footer className='header row no-gutters justify-content-end'>
      <div className='col-md-1 col-4 order-1 order-md-1 align-self-center'>
        <img className="img-fluid" src={logo_cnf} alt='logo_cnf' />
      </div>
    </footer>
  )

}

export default Footer;