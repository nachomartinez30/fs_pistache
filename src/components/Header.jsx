import React from 'react'
import logo_cnf from '../assets/img/conafor-blanco-v.png'
import { Link } from "react-router-dom";
import SideBarNavigation from './SideBarNavigation';


const Header = ({ loged = true, setLoged }) => {
    return (
        <div className='header row no-gutters'>
            <div className='col-md-1 col-4 order-1 order-md-1 align-self-center'>
                {loged &&
                    <Link to='/main'>
                        <img className="img-fluid" src={logo_cnf} alt="cnf_logo" />
                    </Link>
                }</div>
            <div className='col-md-10 col-12 order-3 order-md-2 align-self-center'>
                <h1 className='header-font'>FONDO SECTORIAL</h1>
            </div>
            <div className='col-md-1 col-8 order-2 order-md-2 align-self-center'> {loged &&
                <SideBarNavigation
                    setLoged={setLoged}
                />
            }</div>
        </div>
    )
}
export default Header;